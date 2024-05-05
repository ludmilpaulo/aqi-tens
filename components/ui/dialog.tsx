import React, { useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Dialog = ({ visible, onClose, children }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={tailwind('fixed inset-0 bg-black bg-opacity-80')}
      activeOpacity={1}
      onPress={onClose}
    >
      <View style={tailwind('m-4 p-4 bg-white rounded-lg')}>
        {children}
      </View>
    </TouchableOpacity>
  </Modal>
);

const DialogClose = ({ onClose }) => (
  <TouchableOpacity onPress={onClose} style={tailwind('absolute top-4 right-4')}>
    <FontAwesomeIcon icon={faTimes} size={24} />
  </TouchableOpacity>
);

const DialogContent = ({ children }) => (
  <View style={tailwind('')}>
    {children}
  </View>
);

const DialogHeader = ({ children }) => (
  <View style={tailwind('mb-4')}>
    <Text style={tailwind('text-lg font-bold')}>{children}</Text>
  </View>
);

const DialogFooter = ({ children }) => (
  <View style={tailwind('mt-4 flex-row justify-end')}>
    {children}
  </View>
);

const DialogTitle = ({ children }) => (
  <Text style={tailwind('text-xl font-semibold')}>{children}</Text>
);

const DialogDescription = ({ children }) => (
  <Text style={tailwind('text-base')}>{children}</Text>
);

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
