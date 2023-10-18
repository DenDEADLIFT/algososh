import { baseUrl } from '../../src/constants/test-constants'

describe("Главная страница открывается", () => {
  it("Страница запустилась на localhost:3000", () => {
    cy.viewport(1450, 860)
    cy.visit(baseUrl)
  })
})