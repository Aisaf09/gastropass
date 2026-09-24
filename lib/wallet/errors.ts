export class WalletNotConfiguredError extends Error {
  constructor(platform: "apple" | "google", missing: string[]) {
    super(
      `${platform === "apple" ? "Apple" : "Google"} Wallet isn't configured yet. Missing: ${missing.join(", ")}.`,
    );
    this.name = "WalletNotConfiguredError";
  }
}
