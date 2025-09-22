-- CreateTable
CREATE TABLE "ChatSession" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "confidence_score" DOUBLE PRECISION,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatSession_user_id_idx" ON "ChatSession"("user_id");

-- CreateIndex
CREATE INDEX "ChatSession_created_at_idx" ON "ChatSession"("created_at");

-- CreateIndex
CREATE INDEX "ChatMessage_session_id_idx" ON "ChatMessage"("session_id");

-- CreateIndex
CREATE INDEX "ChatMessage_created_at_idx" ON "ChatMessage"("created_at");

-- AddForeignKey
ALTER TABLE "ChatSession" ADD CONSTRAINT "ChatSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "ChatSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
