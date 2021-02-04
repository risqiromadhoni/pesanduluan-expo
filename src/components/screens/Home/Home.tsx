import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, SafeAreaView, InteractionManager } from "react-native";
import { SearchBar, LoadingIndicator } from "@src/components/elements";
import PopularPlaces from "./PopularPlaces";
import RecommendedPlaces from "./RecommendedPlaces";
// import MerchantCampaigns from "./MerchantCampaigns";
import PopularCategories from "./PopularCategories";
import HotDeals from "./HotDeals";
import RemarkablePlaces from "./RemarkablePlaces";
import AppReviewModal from "@src/components/common/AppReviewModal";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const [
    isNavigationTransitionFinished,
    setIsNavigationTransitionFinished,
  ] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setIsNavigationTransitionFinished(true);
      });
      return () => task.cancel();
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]}>
        <SearchBar placeholder="Cari makanan, jalan, kota..." />
        <PopularCategories />
        {isNavigationTransitionFinished ? (
          <>
            <PopularPlaces />
            {/* <MerchantCampaigns /> */}
            <RecommendedPlaces />
            <HotDeals />
            <RemarkablePlaces />
          </>
        ) : (
          <LoadingIndicator size="large" hasMargin />
        )}
      </ScrollView>
      <AppReviewModal daysBeforeReminding={1} />
    </SafeAreaView>
  );
};

export default Home;
