import { DateFormatter } from "./date-formatter"

const daylightDate = new Date('2021-02-03T14:15:16Z')
const standardDate = new Date('2021-08-03T14:15:16Z')
const daylightFormatter = new DateFormatter(daylightDate, 'Australia/Sydney')
const standardFormatter = new DateFormatter(standardDate, 'Australia/Sydney')
const westFormatter = new DateFormatter(standardDate, 'Australia/Perth')
const utcFormatter = new DateFormatter(standardDate, 'UTC')

test('getYear', () => {
    expect(daylightFormatter.getYear()).toEqual('2021')
    expect(daylightFormatter.getYear('2-digit')).toEqual('21')
})
test('getMonth', () => {
    expect(daylightFormatter.getMonth()).toEqual('2')
    expect(daylightFormatter.getMonth('2-digit')).toEqual('02')
})
test('getDay', () => {
    expect(daylightFormatter.getDay()).toEqual('4')
    expect(daylightFormatter.getDay('2-digit')).toEqual('04')
})
test('getHour', () => {
    expect(daylightFormatter.getHour()).toEqual('1')
    expect(daylightFormatter.getHour('2-digit')).toEqual('01')
    expect(standardFormatter.getHour()).toEqual('12')
})
test('getMinute', () => {
    expect(daylightFormatter.getMinute()).toEqual('15')
    expect(standardFormatter.getMinute()).toEqual('15')
})
test('getSecond', () => {
    expect(daylightFormatter.getSecond()).toEqual('16')
    expect(standardFormatter.getSecond()).toEqual('16')
})
test('getMeridiem', () => {
    expect(daylightFormatter.getMeridiem()).toEqual('AM')
    expect(standardFormatter.getMeridiem()).toEqual('AM')
})
test('getTimeZoneName', () => {
    expect(daylightFormatter.getTimeZoneName()).toEqual('AEDT')
    expect(standardFormatter.getTimeZoneName()).toEqual('AEST')
    expect(daylightFormatter.getTimeZoneName('offset')).toEqual('+11:00')
    expect(standardFormatter.getTimeZoneName('offset')).toEqual('+10:00')
    expect(utcFormatter.getTimeZoneName('offset')).toEqual('Z')
    expect(westFormatter.getTimeZoneName('offset')).toEqual('+08:00')
})
test('toDate', () => {
    expect(daylightFormatter.toDate()).toEqual('4/2/2021')
})
test('toDateTime', () => {
    expect(daylightFormatter.toDateTime()).toEqual('4/2/2021 1:15:16 AM')
    expect(standardFormatter.toDateTime()).toEqual('4/8/2021 12:15:16 AM')
})
test('toDateTimeTz', () => {
    expect(daylightFormatter.toDateTimeTz()).toEqual('4/2/2021 1:15:16 AM AEDT')
    expect(standardFormatter.toDateTimeTz()).toEqual('4/8/2021 12:15:16 AM AEST')
})
test('toIsoDate', () => {
    expect(daylightFormatter.toIsoDate()).toEqual('2021-02-04')
})
test('toIsoDateTime', () => {
    expect(daylightFormatter.toIsoDateTime()).toEqual('2021-02-04T01:15:16+11:00')
    expect(utcFormatter.toIsoDateTime()).toEqual('2021-08-03T14:15:16Z')
})
test('toTime', () => {
    expect(daylightFormatter.toTime()).toEqual('1:15:16 AM')
    expect(daylightFormatter.toTime('2-digit')).toEqual('01:15:16 AM')
    expect(standardFormatter.toTime()).toEqual('12:15:16 AM')
    expect(standardFormatter.toTime('24')).toEqual('00:15:16')
})

test('Time zone change', () => {
    daylightFormatter.setTimeZone('Australia/Perth')
    expect(daylightFormatter.getDay()).toEqual('3')
})