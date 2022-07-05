import { sentryConfig } from "@/configs/config"
import * as Sentry from "@sentry/node"

export default class SentryComponent {
    static init(): void {
        Sentry.init({ dsn: sentryConfig.URI })
    }

    static captureException(error: unknown, data = null, ctx = null, user = null): void {
        Sentry.withScope(scope => {
            if (user) {
                scope.setUser(user)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            } else if (ctx && ctx.state.user) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                scope.setUser(ctx.state.user)
            }
            if (ctx) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                scope.setExtra("request", ctx.request)
            }
            if (data) {
                scope.setExtra("data", data)
            }
            Sentry.captureException(error)
        })

        console.log("captureException", data)
    }
}
