import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js'
import { useQuery } from '@tanstack/react-query'


export const useGaletoOraclePrice = ({ address, enabled }) => {
  const { data, refetch } = useQuery({
    queryKey: ['galeto-oracle-price', address],

    queryFn: async () => {
      const connection = new EvmPriceServiceConnection('https://hermes.pyth.network', { verbose: true })
      const priceIds = [address]
      const result = (await connection.getLatestPriceFeeds(priceIds )) 

      return result?.[0]?.price?.price ?? 0n
    },

    refetchInterval: 5000,
    enabled: Boolean(enabled),
  })

  return {
    galetoOraclePrice: BigInt(data ?? 0n),
    refetchGaletoOraclePrice: refetch,
  }
}
