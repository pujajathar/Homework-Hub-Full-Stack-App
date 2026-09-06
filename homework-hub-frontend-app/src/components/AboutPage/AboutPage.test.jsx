import { render, screen } from "@testing-library/react";
import AboutPage from "./AboutPage";
import { expect, test } from "vitest";

test("renders About Page content", () => {
    render(<AboutPage />);
    expect(
        screen.getByText("About AaruEdu")
    ).toBeInTheDocument();
    expect(
        screen.getByText("Our Mission")
    ).toBeInTheDocument();
    expect(
        screen.getByText("Our Vision")
    ).toBeInTheDocument();
    expect(
        screen.getByText("Why AaruEdu?")
    ).toBeInTheDocument();
    expect(
        screen.getByText("Meet the Team")
    ).toBeInTheDocument();
});