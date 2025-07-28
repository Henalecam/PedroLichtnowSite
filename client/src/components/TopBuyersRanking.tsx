import React, { useEffect, useState } from 'react';

interface TopBuyer {
  rank: number;
  userId: string;
  userName: string;
  userEmail: string;
  totalAmount: string;
  purchaseCount: number;
}

interface TopBuyersRankingProps {
  campaignId: string;
}

export function TopBuyersRanking({ campaignId }: TopBuyersRankingProps) {
  const [topBuyers, setTopBuyers] = useState<TopBuyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTopBuyers();
  }, [campaignId]);

  const fetchTopBuyers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/campaigns/${campaignId}/top-buyers?limit=10`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar ranking de compradores');
      }

      const data = await response.json();
      setTopBuyers(data.topBuyers || []);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar ranking de compradores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  if (topBuyers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum comprador encontrado para esta campanha.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4">
        <h2 className="text-2xl font-bold">🏆 Top Compradores</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Gasto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nº Compras
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {topBuyers.map((buyer) => (
              <tr key={buyer.userId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {buyer.rank <= 3 ? (
                      <span className="text-2xl mr-2">
                        {buyer.rank === 1 && '🥇'}
                        {buyer.rank === 2 && '🥈'}
                        {buyer.rank === 3 && '🥉'}
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {buyer.rank}º
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {buyer.userName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {buyer.userEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-green-600">
                    R$ {buyer.totalAmount}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {buyer.purchaseCount}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}