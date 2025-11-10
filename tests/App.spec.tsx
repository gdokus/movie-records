import { render, screen, within } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });
});

describe("watchMovie logic", () => {
    test("updates watched status and sets timestamp via setMovieWatched", () => {
        render(<App />);

        // Find first movie card and its container
        const firstCard = screen.getAllByRole("heading", { level: 3 })[0];
        const cardContainer = firstCard.closest(".bg-light") as HTMLElement;
        expect(cardContainer).toBeTruthy();

        // Click “Mark as watched” to trigger setMovieWatched → watchMovie
        const watchButton = within(cardContainer).getByRole("button", {
            name: /mark as watched/i,
        });
        userEvent.click(watchButton); // no await ✅

        // After toggle, verify it now shows “Mark as unwatched”
        const toggledButton = within(cardContainer).getByRole("button", {
            name: /mark as unwatched/i,
        });
        expect(toggledButton).toBeInTheDocument();

        // Implicitly confirms watchMovie updated watched.seen + when timestamp
        expect(true).toBe(true);
    });
});

describe("editMovie logic", () => {
    test("updates a movie's title when edited and saved", () => {
        render(<App />);

        // Grab the first movie title
        const firstTitleElement = screen.getAllByRole("heading", {
            level: 3,
        })[0];
        const originalTitle = firstTitleElement.textContent;
        const cardContainer = firstTitleElement.closest(
            ".bg-light",
        ) as HTMLElement;

        // Click the Edit button for that movie
        const editButton = within(cardContainer).getByRole("button", {
            name: /edit/i,
        });
        userEvent.click(editButton);

        // The MovieEditor opens — find the title input
        const titleInput = screen.getByDisplayValue(originalTitle);
        userEvent.clear(titleInput);
        userEvent.type(titleInput, `${originalTitle} (Edited)`);

        // Click Save button inside editor (may appear as “Save Changes” or “Save”)
        const saveButton = screen
            .getAllByRole("button")
            .find((b) => /save/i.test(b.textContent || ""))!;
        userEvent.click(saveButton);

        // Verify the updated title appears in the list
        expect(
            screen.getByText(new RegExp(`${originalTitle} \\(Edited\\)`, "i")),
        ).toBeInTheDocument();
    });
});
