import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';

// Utility to combine class names, simplified version for React Native
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Table = React.forwardRef<View, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <ScrollView horizontal={true}>
      <View ref={ref} style={tailwind('w-full')}>
        {children}
      </View>
    </ScrollView>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<View, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <View ref={ref} style={tailwind('border-b')}>
      {children}
    </View>
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<View, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <View ref={ref} style={tailwind('')}>
      {children}
    </View>
  )
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<View, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <View ref={ref} style={tailwind('border-t bg-gray-200')}>
      {children}
    </View>
  )
);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<View, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <View ref={ref} style={tailwind('border-b py-2')}>
      {children}
    </View>
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<Text, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <Text ref={ref} style={tailwind('font-medium text-gray-600 px-4')}>
      {children}
    </Text>
  )
);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<Text, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <Text ref={ref} style={tailwind('px-4 py-2')}>
      {children}
    </Text>
  )
);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<Text, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <Text ref={ref} style={tailwind('text-gray-500 text-sm p-4')}>
      {children}
    </Text>
  )
);
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
