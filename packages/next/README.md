# @no-auth/next

Simple, lightweight authentication middleware and context provider for Next.js applications.

## 🚀 Features

- Seamless authentication middleware
- React context provider with SWR
- Easy-to-use hook for user data
- Minimal setup required

## 📦 Installation

```bash
npm install @no-auth/next
# or
yarn add @no-auth/next
# or
pnpm add @no-auth/next
```

## 🔧 Setup

### 1. Middleware Configuration

In your Next.js `middleware.ts`:

```typescript
import { noAuthMiddleware } from "@no-auth/next";
import { NextResponse } from "next/server";
import { MiddlewareConfig, NextRequest } from "next/server";

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

export const publicRouteStartsWith: string[] = [];

export default async function middleware(request: NextRequest) {
  /**
   * Pre-process
   */

  const response: NextResponse = await noAuthMiddleware(
    request,
    publicRouteStartsWith,
  );

  /**
   * Post-process
   */

  return response;
}
```

### 2. Root Layout Provider

In your root `layout.tsx`:

```typescript
import { NoAuthProvider } from '@no-auth/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NoAuthProvider>
          {children}
        </NoAuthProvider>
      </body>
    </html>
  );
}
```

### 3. Using User Data

In any component:

```typescript
import { useUser } from '@no-auth/next';

function ProfilePage() {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

## 🛠 API Reference

### `noAuthMiddleware(options)`

#### Options

- `publicRoutes`: Array of routes accessible without authentication

### `<NoAuthProvider />`

Wraps your application with authentication context using SWR.

### `useUser()`

#### Returns

- `user`: Current user data
- `isLoading`: Boolean indicating data loading state
- `error`: Any error during user data fetching

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🐛 Issues

Found a bug? [Open an issue](https://github.com/Sagar-v4/no-auth/issues)
