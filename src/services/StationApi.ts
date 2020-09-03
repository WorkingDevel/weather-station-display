import { SourceDaily } from "../domain/source-json";

export function fetchDailyData(url: URL): Promise<SourceDaily> {
    return fetch(url.toString())
      .then(response => response.json())
      // .then(
      //   // handle the result
      //   (result: SourceDaily) => {
      //     console.info(result);
      //     return result;
      //   },

      //   // Handle error
      //   (error) => {
      //     console.error(error);
      //     return null;
      //   },
      // )
}
