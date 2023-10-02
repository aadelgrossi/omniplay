import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { act } from "react-dom/test-utils";

import useSearchGames from "@/modules/search/useSearchGames";

import { server } from "../mocks/server";

const queryClient = new QueryClient();
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mocks = vi.hoisted(() => {
  return {
    usePathname: vi.fn(),
    useRouter: vi.fn().mockReturnValue({
      push: vi.fn(),
    }),
    useSearchParams: vi.fn(),
  };
});

describe("useSearchGames", () => {
  beforeAll(() => {
    server.listen();
  });
  it("initializes with default values for page, pageSize and totalPages", () => {
    vi.mock("next/navigation", async () => mocks);

    const { result } = renderHook(() => useSearchGames(), { wrapper });
    expect(result.current.totalPages).toBe(1);
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });

  it("initializes with custom input value and pagination controls from query string", async () => {
    const searchParams = new URLSearchParams({
      q: "horizon",
      page: "2",
      page_size: "20",
    });

    mocks.useRouter.mockReturnValue({
      push: vi.fn(),
    });
    mocks.useSearchParams.mockReturnValue(searchParams);

    const { result } = renderHook(() => useSearchGames(), { wrapper });
    expect(result.current.inputValue).toBe("horizon");
    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(20);
  });

  it("clears value from query on resetSearch()", async () => {
    const searchParams = new URLSearchParams({ q: "horizon" });

    mocks.useRouter.mockReturnValue({ push: vi.fn() });
    mocks.useSearchParams.mockReturnValue(searchParams);

    const { result } = renderHook(() => useSearchGames(), { wrapper });
    expect(result.current.inputValue).toBe("horizon");

    act(() => {
      result.current.resetSearch();
    });

    await waitFor(() => expect(result.current.inputValue).toBe(""));
  });
  it("updates url when updating page_size", async () => {
    const searchParams = new URLSearchParams({ page_size: "10" });

    const push = vi.fn();

    mocks.useRouter.mockReturnValue({ push });
    mocks.useSearchParams.mockReturnValue(searchParams);

    const { result } = renderHook(() => useSearchGames(), { wrapper });
    expect(result.current.pageSize).toBe(10);

    act(() => {
      result.current.onChangePageSize("20");
    });

    expect(push).toHaveBeenCalledWith(`/?page_size=20`);
  });
  it("updates url when updating page", async () => {
    const searchParams = new URLSearchParams({ page: "1" });

    const push = vi.fn();

    mocks.useRouter.mockReturnValue({ push });
    mocks.useSearchParams.mockReturnValue(searchParams);

    const { result } = renderHook(() => useSearchGames(), { wrapper });

    act(() => {
      result.current.nextPage();
    });

    await waitFor(() => expect(push).toHaveBeenCalledWith(`/?page=2`));
  });
});
