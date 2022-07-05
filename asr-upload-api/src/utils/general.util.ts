export function Property(defaultValue: unknown = undefined): PropertyDecorator {
    return (target: Record<string, unknown>, name: string): void => {
        if (defaultValue !== undefined) {
            target[name] = defaultValue
        }

        Reflect.defineMetadata("fields", true, target, name)
    }
}

export function isEnv(env: string): boolean {
    const envSystem = process.env.NODE_ENV || "dev"

    return env === envSystem
}

export function isDebug(): boolean {
    const envSystem = process.env.NODE_ENV || "dev"

    return "production" !== envSystem
}

export const telephoneCheckAndGet = (str: string): string | null => {
    const phone = str.replace(/[^0-9]/g, "");

    const isPhone = /^(084|84|0?[3|5|7|8|9])+([0-9]{8})\b/g.test(phone);

    if (isPhone) {
        return toStandard(phone)
    }

    return null
}

const toStandard = (phone: string) => {
    if (phone.length === 10 && phone[0] === "0") {
        return `84${phone}`.replace(/840/g, "84");
    } else {
        let p = phone;
        if (p[0] === "0") {
            p = p.replace(/084/g, "84");
        }

        if (p[2] === "0") {
            p = p.replace(/840/g, "84");
        }

        return p;
    }
}