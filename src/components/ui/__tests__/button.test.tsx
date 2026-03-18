import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when the disabled prop is set", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/home">Go home</a>
      </Button>
    );
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
  });
});
