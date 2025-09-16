# 2FA Implementation Notes

## Overview
This PR implements the authentication flow including 2FA setup and verification. It adds proper API integration for login, registration, password reset, and 2FA management.

## Local Testing Steps

1. Create & Verify User
   ```bash
   # 1. Start services
   cd backend/infra
   docker-compose -f docker-compose.dev.yml up
   
   # 2. Start frontend
   cd frontend
   pnpm dev
   
   # 3. Create user at http://localhost:5173/register-step1
   # 4. Complete KYC at step2 (or use admin panel to approve)
   ```

2. Enable & Test 2FA
   ```
   1. Login and navigate to Profile & Security
   2. Enable 2FA and scan QR in your authenticator app
   3. Enter TOTP code to complete setup
   4. Save backup codes shown after verification
   ```

3. Test Login Flow
   ```
   1. Logout
   2. Login with email/password
   3. You should be redirected to 2FA page
   4. Enter TOTP code from authenticator
   5. Should redirect to dashboard with tokens set
   ```

## Test Cases

### Registration
- [ ] Register returns netbanking_id and navigates to step 2
- [ ] Form validation works (password rules, matching confirm)
- [ ] Error handling shows API errors to user

### Login
- [ ] Basic login (2FA disabled) works and sets tokens
- [ ] 2FA login flow:
  - [ ] Shows 2FA screen after password
  - [ ] Accepts TOTP or backup code
  - [ ] Sets tokens after 2FA verify
  - [ ] Shows errors for invalid codes

### Two-Factor Setup  
- [ ] Enable 2FA generates QR code
- [ ] QR scan + TOTP verify works
- [ ] Receive and save backup codes
- [ ] Can disable 2FA with password

### Password Reset
- [ ] Request reset sends email
- [ ] Can reset with token from email
- [ ] Shows errors for invalid tokens
- [ ] New password works for login

## Security Notes

Current Implementation:
- Tokens stored in sessionStorage (will move to httpOnly cookies)
- Plain passwords never stored between pages
- 2FA secrets passed via React Router state only
- Rate limiting on auth endpoints
- Password rules enforced client & server side

TODOs:
- [ ] Move to httpOnly cookies for tokens
- [ ] Add CSRF protection
- [ ] Implement auto-refresh of tokens
- [ ] Add password strength meter
- [ ] Rate limit 2FA attempts