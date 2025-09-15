sequenceDiagram
  autonumber
  participant FE as Frontend
  participant BFF as BFF (requireAuth + requireKycVerified)
  participant ACC as Account Service
  participant OBJ as Object Storage
  participant DBA as Postgres (accounts)

  rect rgb(245,255,245)
  FE->>BFF: POST /statements {account_id, date_from, date_to, format, delivery}
  BFF->>ACC: POST /statements
  ACC->>DBA: ownership check (account.user_id)
  ACC->>ACC: generate statement file (PDF/CSV)
  ACC->>OBJ: upload file -> file_url
  ACC->>DBA: statements.insert(file_url, status='completed')
  ACC-->>BFF: 201 { id, status, file_url? }
  BFF-->>FE: 201
  end

  rect rgb(255,250,240)
  FE->>BFF: POST /statements/:id/download-token
  BFF->>ACC: POST /statements/:id/download-token
  ACC->>DBA: verify ownership
  ACC->>ACC: create random token
  ACC->>DBA: store statement_tokens(token_hash, expires_at)
  ACC-->>BFF: { token }
  BFF-->>FE: { token }
  end

  rect rgb(250,245,255)
  FE->>BFF: GET /statements/:id/signed-url?token=...
  BFF->>ACC: GET /statements/:id/signed-url?token=...
  ACC->>DBA: validate token hash + expiry + user_id
  ACC->>OBJ: sign file_url (time-limited)
  ACC-->>BFF: { signed_url }
  BFF-->>FE: { signed_url }
  end
