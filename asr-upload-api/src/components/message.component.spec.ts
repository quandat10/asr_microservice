// test("getErrorMessage_ValidInput_ReturnDefaultMessage", async () => {
//     const message = new Message()
//     const errorMessage = message.getMessage("ID_NOT_EXIST")
//     expect(errorMessage).toStrictEqual("Id không tồn tại")
// })

// test("getErrorMessage_ValidInput_ReturnEnMessage", async () => {
//     const message = new Message("en")
//     const errorMessage = message.getMessage("ID_NOT_EXIST")
//     expect(errorMessage).toStrictEqual("Id doesn't exist")
// })

// test("getErrorMessage_ValidInput_ReturnViMessage", async () => {
//     const message = new Message("vi")
//     const errorMessage = message.getMessage("ID_NOT_EXIST")
//     expect(errorMessage).toStrictEqual("Id không tồn tại")
// })

// test("getErrorMessage_UnavailableLanguage_ReturnEnMessage", async () => {
//     const message = new Message("cn")
//     const errorMessage = message.getMessage("ID_NOT_EXIST")
//     expect(errorMessage).toStrictEqual("Id không tồn tại")
// })