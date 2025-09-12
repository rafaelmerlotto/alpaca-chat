import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";



test("test boolean value", () => {

    render(<Header model={"2"} availableModels={[]} />);

    expect(screen.getByText("OFF")).toBeInTheDocument();

    const button = screen.getByText("Toggle");

    fireEvent.click(button);
    expect(screen.getByText("ON")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("OFF")).toBeInTheDocument();
});
