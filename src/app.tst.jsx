import App from "./App";
import { render, screen } from "@testing-library/react";;

describe ("<App> Tests", () => {
    test("Verificar se a tela principal esta sendo renderizada", () => {
        render(<App />);
        const nome = screen.getByText("DH Odonto");

        expect(nome).toBeIntheDocument();
    })
})