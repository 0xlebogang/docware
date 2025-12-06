# web

## 0.2.0

### Minor Changes

- 7a1c265: Added dynamic authentication button rendering
  - Navbar renders the sign in, sign out and user avatar conditionally based on the authentication status of the user
  - On mobile, authentication status controls whether the menu or avatar is rendered

### Patch Changes

- Updated dependencies [7a1c265]
  - @repo/better-auth@0.0.2

## 0.1.0

### Minor Changes

- 7be50d5: Added user authentication pages and logic.
  - User's authentication status is checked upon first request
  - Authenticated user's get access to dashboard page (for now)
  - Unauthenticated users get redirected to sign in page

### Patch Changes

- @repo/better-auth@0.0.1
