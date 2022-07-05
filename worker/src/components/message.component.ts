import { injectable } from "inversify"

import langs from "../i18n/index"

@injectable()
export class MessageComponent {
    static langs: Map<string, Map<string, string>>
    static languageDefault = "vi"

    static init(): void {
        MessageComponent.langs = langs
    }

    lang(message: string, language: string = null): string {
        const lang = language ? language : MessageComponent.languageDefault

        if (MessageComponent.langs) {
            if (MessageComponent.langs.has(lang)) {
                return MessageComponent.langs.get(lang).get(message) || message
            }
            else {
                //fallback to default 
                return MessageComponent.langs.get(MessageComponent.languageDefault).get(message) || message
            }
        }

        return message
    }
}
