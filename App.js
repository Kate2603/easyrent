import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

import Header from "./Header";
import FilterChips from "./FilterChips";
import SearchForm from "./SearchForm";
import ApartmentCard from "./ApartmentCard";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";
import SuccessScreen from "./SuccessScreen";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="EasyRent App" />

      <FilterChips
        filters={["wifi", "pets", "parking"]}
        onFilterSelect={(f) => console.log("Filter selected:", f)}
      />

      <SearchForm onSubmit={(data) => console.log("Search submitted:", data)} />

      <ApartmentCard />

      <BookingForm
        onSubmit={(data) => console.log("Booking submitted:", data)}
      />

      <PaymentForm
        onSubmit={(data) => console.log("Payment submitted:", data)}
      />

      <SuccessScreen onReturn={() => console.log("Return tapped")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 64,
  },
});
