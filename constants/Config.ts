import ExpoConstants from 'expo-constants';

export const baseUrl = 'https://newsapi.org/v2';
export const apiKey = ExpoConstants.manifest?.extra?.newsApiKey;
export const endpoint = 'top-headlines';
export const queryOptions = {
  sortBy: 'popularity',
  limit: '5',
  search: 'crypto',
};



export const apiKeyMedia = "coinranking3c56020f900c2e28c46f02e8f57b02ca5b1fbf57336d898d"
