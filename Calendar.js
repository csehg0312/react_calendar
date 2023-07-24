import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to get the number of days in the current month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Function to get the first day of the month (0 - Sunday, 1 - Monday, ...)
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  // Function to handle navigating to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // Function to handle navigating to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Create an array to hold the days of the current month
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const daysArray = [...Array(firstDay).fill(null), ...Array(daysInMonth).fill().map((_, i) => i + 1)];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <Text style={styles.headerText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Text style={styles.headerText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendarGrid}>
        {daysArray.map((day, index) => (
          <View key={index} style={styles.calendarCell}>
            {day !== null && <Text style={styles.dayText}>{day}</Text>}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayText: {
    fontSize: 16,
  },
});

export default Calendar;
