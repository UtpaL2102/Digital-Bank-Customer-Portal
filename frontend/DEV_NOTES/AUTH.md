# Authentication Setup and Testing Guide

## Overview
The frontend app uses client-side route protection to guard authenticated routes.
Authentication state is currently stored in sessionStorage (temporary dev solution).
TODO: Move to httpOnly cookies in production.

## Testing Authentication

### Clear Authentication State
```javascript
sessionStorage.removeItem('access_token');
sessionStorage.removeItem('refresh_token');
```

### Testing Different User States

1. Unauthenticated:
   - Clear sessionStorage
   - Try accessing /dashboard (should redirect to /login)

2. Authenticated but not KYC Verified:
   - Login with a new user account
   - Try accessing protected routes (should redirect to /kyc-status)

3. Authenticated and KYC Verified:
   - Login with a verified user
   - All protected routes should be accessible

4. Admin Access:
   - Login with admin credentials
   - Access /admin route (should work)
   - Login with regular user
   - Try /admin route (should redirect to /forbidden)

## Important Notes

- Never store tokens in localStorage (XSS vulnerable)
- Current sessionStorage implementation is for development only
- Production should use httpOnly secure cookies
- Backend maintains the real security - frontend protection is for UX only

## KYC Status Testing

To simulate a verified user in development:
1. Register a new account
2. Submit KYC documents
3. Use admin account to approve KYC
4. Or use force-verify script (ask DevOps team)

## TODO for Production
- [ ] Move token storage to httpOnly cookies
- [ ] Implement refresh token rotation
- [ ] Add CSRF protection
- [ ] Enable secure and SameSite cookie attributes