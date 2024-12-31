# Pokemon Sprite Downloader

This project downloads official artwork sprites of Pokemon from the PokeAPI.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/choephix-experiments/pokemon-sprite-downloader.git
    cd pokemon-sprite-downloader
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

To download the Pokemon sprites, run the following command:
```sh
npm run download-art
```

## Configuration

You can configure the following parameters in `src/main.js`:
- `limit`: The number of Pokemon to download.
- `offset`: The starting point for downloading Pokemon.
- `downloadDirBase`: The base directory for downloads.
- `concurrency`: The number of concurrent downloads.
- `shouldSaveAllResultsInOneBigJSON`: Whether to save all results in one big JSON file.
