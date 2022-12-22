import { NextPageContext, GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextComponentType } from 'next';
import universalCookie, { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

declare type NextApiRequestResponse = {
    req: NextApiRequest;
    res: NextApiResponse;
};
declare class Cookie {
    ctx?: NextApiRequestResponse;
    cookie: universalCookie;
    isServer: boolean;
    constructor(ctxOrCookie?: NextPageContext | GetServerSidePropsContext | NextApiRequestResponse | string);
    static fromApiRoute(req: NextApiRequest, res: NextApiResponse): Cookie;
    /**
     * Returns true if the cookie value exists.
     *
     * @param name The name of the cookie.
     * @returns True if it exists, false otherwise.
     */
    has(name: string): boolean;
    /**
     * Get value of cookie.
     *
     * @param name The name of the cookie.
     * @param options `CookieGetOptions` used in `universal-cookie`.
     * @returns The cookie value or null if not found.
     */
    get<T>(name: string, options?: CookieGetOptions): T;
    /**
     * Get all cookies.
     *
     * @param options `CookieGetOptions` used in `universal-cookie`.
     */
    getAll(options?: CookieGetOptions): {
        [name: string]: any;
    };
    /**
     * Set a cookie.
     *
     * @param name The name of the cookie.
     * @param value The value of the cookie.
     * @param options `CookieSetOptions` used in `universal-cookie`.
     */
    set(name: string, value: any, options?: CookieSetOptions): void;
    /**
     * Remove a cookie by name.
     *
     * @param name The name of the cookie.
     * @param options `CookieSetOptions` used in `universal-cookie`.
     */
    remove(name: string, options?: CookieSetOptions): void;
}

declare function useCookie(ctxOrCookie?: NextPageContext | GetServerSidePropsContext | string): Cookie;

interface WithCookieProps {
    cookie?: Cookie;
}
interface WithCookieContext extends NextPageContext {
    cookie?: Cookie;
}
declare function withCookie<Props extends WithCookieProps, InitialProps extends {
    [key: string]: any;
}>(ComposedComponent: NextComponentType<WithCookieContext, InitialProps, Props>): NextComponentType<WithCookieContext, InitialProps, Props>;

export { Cookie, WithCookieContext, WithCookieProps, useCookie, withCookie };
