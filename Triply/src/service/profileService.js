import api from './service.js';

export const CURRENT_USER_ID = 1;

function normalizarUsuario(usuarioAPI) {
  return {
    id: usuarioAPI.id,
    name: usuarioAPI.nome,
    username: usuarioAPI.nome.toLowerCase().replace(/\s+/g, '.'),
    bio: usuarioAPI.bio || 'Usuário do Triply',
    avatar: usuarioAPI.foto,
    followers: usuarioAPI.followers || [],
    following: usuarioAPI.following || [],
    favoritePosts: usuarioAPI.favoritePosts || [],
  };
}

function normalizarPublicacao(pubAPI) {
  return {
    id: pubAPI.id,
    userId: pubAPI.usuarioId,
    image: pubAPI.imagem,
    text: pubAPI.texto,
    nomeUsuario: pubAPI.nomeUsuario,
    fotoPerfil: pubAPI.fotoPerfil,
    curtidas: pubAPI.curtidas,
    comentariosCount: pubAPI.comentariosCount,
    salvamentos: pubAPI.salvamentos,
    data: pubAPI.data,
  };
}

export async function fetchUserById(userId) {
  try {
    const response = await api.get(`/usuarios/${userId}`);
    return normalizarUsuario(response.data);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

export async function fetchPostsByUser(userId) {
  try {
    const response = await api.get(`/publicacoes?usuarioId=${userId}`);
    return response.data.map(normalizarPublicacao);
  } catch (error) {
    console.error('Erro ao buscar publicações do usuário:', error);
    return [];
  }
}

export async function fetchAllPosts() {
  try {
    const response = await api.get('/publicacoes');
    return response.data.map(normalizarPublicacao);
  } catch (error) {
    console.error('Erro ao buscar todas as publicações:', error);
    return [];
  }
}

export async function fetchCurrentUserProfile(userId) {
  try {
    const usuarioResponse = await api.get(`/usuarios/${userId}`);
    const usuarioNormalizado = normalizarUsuario(usuarioResponse.data);
    
    const publicacoesResponse = await api.get(`/publicacoes?usuarioId=${userId}`);
    
    return {
      ...usuarioNormalizado,
      postsCount: publicacoesResponse.data.length,
    };
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário atual:', error);
    return null;
  }
}

export async function updateUserProfile(userId, updates) {
  try {
    // Mapeamento de campos normalizados para campos da API
    const updateData = {
      nome: updates.name || updates.nome,
      bio: updates.bio,
      foto: updates.avatar || updates.foto,
      following: updates.following,
      followers: updates.followers,
      favoritePosts: updates.favoritePosts,
    };

    // Remove campos undefined
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await api.patch(`/usuarios/${userId}`, updateData);
    return normalizarUsuario(response.data);
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    return null;
  }
}

export async function updateFavoritePosts(userId, favoritePosts) {
  try {
    const response = await api.patch(`/usuarios/${userId}`, {
      favoritePosts,
    });
    return normalizarUsuario(response.data);
  } catch (error) {
    console.error('Erro ao atualizar favoritos:', error);
    return null;
  }
}

export async function fetchAllUsers() {
  try {
    const response = await api.get('/usuarios');
    return response.data.map(normalizarUsuario);
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    return [];
  }
}

export async function toggleFollowRelationship(currentUserId, targetUserId, shouldFollow) {
  try {
    // Buscar usuários atuais
    const [currentUserRes, targetUserRes] = await Promise.all([
      api.get(`/usuarios/${currentUserId}`),
      api.get(`/usuarios/${targetUserId}`),
    ]);

    const currentUser = currentUserRes.data;
    const targetUser = targetUserRes.data;

    const curFollowing = new Set(currentUser.following || []);
    const tarFollowers = new Set(targetUser.followers || []);

    if (shouldFollow) {
      curFollowing.add(Number(targetUserId));
      tarFollowers.add(Number(currentUserId));
    } else {
      curFollowing.delete(Number(targetUserId));
      tarFollowers.delete(Number(currentUserId));
    }

    // Atualizar ambos os usuários
    await Promise.all([
      api.patch(`/usuarios/${currentUserId}`, {
        following: Array.from(curFollowing),
      }),
      api.patch(`/usuarios/${targetUserId}`, {
        followers: Array.from(tarFollowers),
      }),
    ]);

    return {
      currentUser: { ...currentUser, following: Array.from(curFollowing) },
      targetUser: { ...targetUser, followers: Array.from(tarFollowers) },
    };
  } catch (error) {
    console.error('Erro ao alternar relacionamento de follow:', error);
    return null;
  }
}
