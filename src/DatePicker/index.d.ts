import * as React from 'react';
import { CalendarProps } from '../Calendar';
import { PopoverCommonProps } from '../common';

export interface DatePickerProps extends CalendarProps {
  customInput?: React.ReactNode;
  inputProps?: {};
  dateFormat?: string | Function;
  locale?: string | { distanceInWords?: {}; format?: {} };
  disabled?: boolean;
  inputDataHook?: string;
  calendarDataHook?: string;
  placeholderText?: string;
  rtl?: boolean;
  value?: {};
  isOpen?: boolean;
  initialOpen?: boolean;
  error?: boolean;
  errorMessage?: React.ReactNode;
  width?: number | string;
  zIndex?: number;
  popoverProps?: PopoverCommonProps;
}

export default class DatePicker extends React.PureComponent<DatePickerProps> {}
