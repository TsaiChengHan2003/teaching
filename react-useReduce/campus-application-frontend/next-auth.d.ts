import { Account } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        id_token?: Account.id_token
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id_token?: Account.id_token
    }
}