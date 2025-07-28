import React, { useState, useEffect } from 'react';
import { TopBuyersRanking } from '../../components/TopBuyersRanking';

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/campaigns');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar campanhas');
      }

      const data = await response.json();
      setCampaigns(data);
      
      // Se houver campanhas, selecionar a primeira
      if (data.length > 0) {
        setSelectedCampaign(data[0].id);
      }
    } catch (err) {
      setError('Erro ao carregar campanhas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMinigameClick = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/minigames/campaign/${campaignId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao buscar minigames:', errorData);
        alert(`Erro: ${errorData.message || 'Erro ao buscar minigames'}`);
        return;
      }

      const minigames = await response.json();
      console.log('Minigames:', minigames);
      // Aqui você pode adicionar lógica para exibir os minigames
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao buscar minigames');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Campanhas</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Campanhas */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h2 className="text-lg font-semibold text-gray-700">Campanhas Ativas</h2>
              </div>
              <div className="p-4">
                {campaigns.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nenhuma campanha encontrada</p>
                ) : (
                  <div className="space-y-2">
                    {campaigns.map((campaign) => (
                      <div
                        key={campaign.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedCampaign === campaign.id
                            ? 'bg-blue-50 border-blue-300 border'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedCampaign(campaign.id)}
                      >
                        <h3 className="font-medium text-gray-800">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            campaign.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.isActive ? 'Ativa' : 'Inativa'}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMinigameClick(campaign.id);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Ver Minigames
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ranking de Top Compradores */}
          <div className="lg:col-span-2">
            {selectedCampaign ? (
              <TopBuyersRanking campaignId={selectedCampaign} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
                Selecione uma campanha para ver o ranking de compradores
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}