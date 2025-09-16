# Authentication & 2FA Integration

This PR adds proper authentication wiring by connecting the frontend pages to the BFF API endpoints. It implements:

- Login flow with 2FA support
- Registration with netbanking_id -> KYC flow
- Password reset via email link or code
- 2FA setup with QR code + backup codes
- Profile security page for password/2FA management

## Testing Instructions

See [frontend/DEV_NOTES/2fa-wiring.md](frontend/DEV_NOTES/2fa-wiring.md) for complete test steps.

Key flows to verify:
1. Register new user (should get netbanking_id)
2. Enable 2FA (scan QR, verify TOTP, save backup codes)  
3. Logout and test login with TOTP
4. Test password reset via email link
5. Try disabling 2FA (requires password + code)

## Security Notes

Current implementation stores tokens in sessionStorage. We'll move to httpOnly cookies in a follow-up PR.

## Changes

- Updated frontend/src/lib/api.js with proper error handling
- Added auth helper functions in frontend/src/lib/authHelpers.js  
- Connected Login, Register, TwoFactor pages to API
- Added unified 2FA verification component
- Implemented password change/reset flows
- Added QR code display for 2FA setup

## Preview

<screenshots of key flows>