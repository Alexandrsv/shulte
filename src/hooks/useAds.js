import bridge from "@vkontakte/vk-bridge";
import { useEffect } from "react";

export const useAds = () => {
  useEffect(() => {
    bridge
      .send("VKWebAppShowBannerAd", {
        banner_location: "bottom",
        can_close: false,
      })
      .then((data) => {
        // @ts-ignore
        if (data.result) {
          // Баннерная реклама отобразилась
        }
        // console.log({ data });
      })
      .catch((error) => {
        // Ошибка
        // console.log({ error });
      });
  }, []);
};
