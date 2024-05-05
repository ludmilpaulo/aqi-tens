import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the import path as necessary
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { basAPI } from '@/configs/variable';

interface ReportData {
  revenue: number[];
  orders: number[];
  products?: { labels: string[]; data: number[] };
  drivers?: { labels: string[]; data: number[] };
  customers?: { labels: string[]; data: number[] };
}

const Report: React.FC = () => {
  const [data, setData] = useState<ReportData>({
    revenue: [],
    orders: [],
    products: { labels: [], data: [] },
    drivers: { labels: [], data: [] },
    customers: { labels: [], data: [] },
  });

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${basAPI}/report/shop/${user.user_id}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData: ReportData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Relatório da loja</Text>
      <View style={styles.chartContainer}>
        <View style={styles.chartBox}>
          <Text style={styles.chartHeader}>Rendimento</Text>
          <LineChart
            data={{
              labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
              datasets: [{ data: data.revenue }]
            }}
            width={screenWidth - 40} // from react-native
            height={220}
            yAxisLabel="$"
            chartConfig={chartConfig}
            bezier
          />
        </View>

        {/* Repeat similar structures for orders, products, drivers, and customers charts */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  chartBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
});

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export default Report;
