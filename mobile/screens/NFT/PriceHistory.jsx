import Accordion from '@components/common/Accordion';
import { View, Text } from 'react-native';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import AccordionTitle from './AccordionTitle';
import { COLORS, SIZES } from '@constants/theme';

const PriceHistory = ({ dataChart = [] }) => {
  dataChart = dataChart.map(Number).reverse();
  const stroke = '#001F2D';
  return (
    <Accordion
      titleComponent={<AccordionTitle type="price" title="Price" />}
      initCollapse
      render={() => (
        <View
          style={{
            height: 200,
            flexDirection: 'row',
            marginTop: SIZES.base + 20,
            marginBottom: -SIZES.medium,
            position: 'relative',
          }}
        >
          <Text
            style={{
              position: 'absolute',
              fontSize: 10,
              transform: [{ translateY: -20 }, { translateX: -5 }],
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 2,
            }}
          >
            GOR
          </Text>
          <YAxis
            style={{ marginBottom: 30 }}
            data={dataChart}
            formatLabel={(idx) => idx}
            contentInset={{ top: 10, bottom: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={dataChart}
              numberOfTicks={8}
              svg={{ stroke }}
              contentInset={{ top: 10, bottom: 10 }}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: 30 }}
              data={dataChart}
              formatLabel={(idx) => `${idx + 1}h`}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      )}
    />
  );
};

export default PriceHistory;
