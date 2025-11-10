import { render, screen, fireEvent } from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";

describe("EditableSongList Component", () => {
    let mockSetSongs: jest.Mock;
    let songs: string[];

    beforeEach(() => {
        mockSetSongs = jest.fn();
        songs = ["Song A", "Song B"];
        render(<EditableSongList songs={songs} setSongs={mockSetSongs} />);
    });

    test("renders all songs in the list", () => {
        expect(screen.getByDisplayValue("Song A")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Song B")).toBeInTheDocument();
    });

    test("calls setSongs when Add Song button is clicked", () => {
        const addButton = screen.getByRole("button", { name: /add song/i });
        fireEvent.click(addButton);

        expect(mockSetSongs).toHaveBeenCalledWith([...songs, ""]);
    });

    test("calls setSongs with updated value when a song input changes", () => {
        const songInput = screen.getByDisplayValue("Song A");
        fireEvent.change(songInput, { target: { value: "Edited Song A" } });

        expect(mockSetSongs).toHaveBeenCalledWith(["Edited Song A", "Song B"]);
    });

    test("calls setSongs with updated list when delete button is clicked", () => {
        const deleteButtons = screen.getAllByRole("button", { name: "❌" });
        fireEvent.click(deleteButtons[0]);

        expect(mockSetSongs).toHaveBeenCalledWith(["Song B"]);
    });

    test("renders numbered list items correctly", () => {
        const listItems = screen.getAllByRole("listitem");
        expect(listItems.length).toBe(2);
    });
});
