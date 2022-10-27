import { useQuery } from '@tanstack/react-query';
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query';
import { Version } from "../types";
import { axios } from 'src/lib/axios';

const getAd = async (): Promise<Version[]> => {

  return axios.get<Version[]>('https://api.github.com/repos/medyo/hackertab.dev/releases')
  .then(response => {
    const versions = response.data as unknown as Version[];
    console.log("response.data", versions)
    return versions
  })
}

type QueryFnType = typeof getAd;

type UseGetAdOptions = {
  config?: QueryConfig<QueryFnType>;
};
export const useGetVersions = ({ config }: UseGetAdOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['versions'],
    queryFn: () => getAd(),
  });
}