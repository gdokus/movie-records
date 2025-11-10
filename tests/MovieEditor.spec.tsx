import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieView } from "../src/components/MovieView";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });
});

describe("MovieView Component", () => {
    const mockSetMovieWatched = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    const mockMovie = {
        id: "movie-xyz",
        title: "The Example Movie",
        rating: 8,
        description: "Testing the movie view",
        released: 2022,
        soundtrack: [],
        watched: { seen: false, liked: false, when: null },
    };

    test("toggles editing mode when changeEditing is triggered", () => {
        render(
            <MovieView
                movie={mockMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        // Initially shows title, not MovieEditor
        expect(screen.getByText("The Example Movie")).toBeInTheDocument();
        expect(
            screen.queryByDisplayValue("The Example Movie"),
        ).not.toBeInTheDocument();

        // Click edit button from RecordControls (simulated)
        const editButtons = screen.getAllByRole("button");
        const editButton = editButtons.find((btn) =>
            /edit/i.test(btn.textContent || ""),
        );
        if (editButton) fireEvent.click(editButton);

        // After click, MovieEditor should appear
        expect(
            screen.getByDisplayValue("The Example Movie"),
        ).toBeInTheDocument();
    });

    test("calls setMovieWatched with correct id and booleans", () => {
        render(
            <MovieView
                movie={mockMovie}
                deleteMovie={mockDeleteMovie}
                editMovie={mockEditMovie}
                setMovieWatched={mockSetMovieWatched}
            />,
        );

        // Simulate watched toggle button from RecordControls
        const watchButtons = screen.getAllByRole("button");
        const watchButton = watchButtons.find((btn) =>
            /watched/i.test(btn.textContent || ""),
        );
        if (watchButton) fireEvent.click(watchButton);

        expect(mockSetMovieWatched).toHaveBeenCalledWith(
            "movie-xyz",
            expect.any(Boolean),
            expect.any(Boolean),
        );
    });
});
