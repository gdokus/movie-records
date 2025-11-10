import { render, screen } from "@testing-library/react";
import { WatchStatus } from "../src/components/WatchStatus";

describe("WatchStatus component", () => {
    it("renders 'Watched' when seen is true", () => {
        render(
            <WatchStatus
                watched={{
                    seen: true,
                    liked: false,
                    when: null,
                }}
            />,
        );
        const watchedText = screen.getByText(/Watched/i);
        expect(watchedText).toBeInTheDocument();
    });

    it("renders 'Not yet watched' when seen is false", () => {
        render(
            <WatchStatus
                watched={{
                    seen: false,
                    liked: false,
                    when: null,
                }}
            />,
        );
        const notWatchedText = screen.getByText(/Not yet watched/i);
        expect(notWatchedText).toBeInTheDocument();
    });
});
