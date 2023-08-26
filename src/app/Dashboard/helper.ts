export const dateFormatter = (date: string | number): string => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  let dateObj;
  const epoch = Number(date);
  if (epoch) {
    dateObj = new Date(epoch * 1000);
  } else {
    dateObj = new Date(date);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return `${dateObj.toLocaleDateString('en-US', options)} ${dateObj.toLocaleTimeString('en-US', { hour12: false })}`;
};

//////////// SET TABLE COLUMNS HERE ///////////////////
export const columns = [
  { key: 'host', label: 'Host' },
  { key: 'release_version', label: 'Release version' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'lastcheck', label: 'Last check', formatter: dateFormatter },
  { key: 'ipaddress', label: 'IP address' },
  { key: 'appstatus', label: 'App status' },
];

///////////// SET DETAIL INFO HERE ///////////////////
export const dataList = [
  { key: 'host', label: 'Host' },
  { key: 'release_version', label: 'Release version' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'lastcheck', label: 'Last check', formatter: dateFormatter },
  { key: 'ipaddress', label: 'IP address' },
  { key: 'appstatus', label: 'App status' },
  { key: 'release_commit', label: 'Release commit' },
  { key: 'os_type', label: 'OS type' },
  { key: 'uuid', label: 'UUID' },
];

///////////// SET REFRESH RATE HERE (in milliseconds) ///////////////////
export const refreshRate = 3000;

///////////// SET URL HOST  ///////////////////

export const apiHost = '';
//export const apiHost = 'http://192.168.0.116';
