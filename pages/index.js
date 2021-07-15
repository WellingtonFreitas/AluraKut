import { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import GithubApi from '../src/services/GithubApi'

// Função que retorna os dados do usuário a partir de seu username utilizando a API do github 
function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {

  const githubUser = 'wellingtonfreitas';
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isShowingMoreFollowers, setIsShowingMoreFollowers] = useState(false);
  const [isShowingMoreCommunities, setIsShowingMoreCommunities] = useState(false);
  const [isShowingMoreFollowing, setIsShowingMoreFollowing] = useState(false);

  const [communities, setCommunities] = useState([
    {
      id: '1',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
      id: '2',
      title: 'V.A.S.P',
      image: 'https://img10.orkut.br.com/community/17884556195e66cd905d6e14.96887551_43880bce0fd32d0d00c078eed1dbed55.jpg',

    },
    {
      id: '3',
      title: 'Eu nunca morri na minha vida',
      image: 'https://img10.orkut.br.com/community/815617765e671c18b30592.81748533_f936bd2e36287ae53d89ce27d36f663e.jpg'
    },
    {
      id: '4',
      title: 'Queremos Yakut 2 Litros',
      image: 'https://img10.orkut.br.com/community/543e2091b6a00799f961b5560157011e.jpg'
    },
    {
      id: '5',
      title: 'Eu odeio segunda-feira',
      image: 'https://img10.orkut.br.com/community/6b1e4e7ee1bae6cf8ef4f7221de03520.png'
    },
    {
      id: '6',
      title: 'Queria sorvete mas era feijão',
      image: 'https://img10.orkut.br.com/community/5772468e52cea8b6dc2d07653185140b.jpg'
    },
    {
      id: '7',
      title: 'Queria sorvete mas era feijão',
      image: 'https://img10.orkut.br.com/community/5772468e52cea8b6dc2d07653185140b.jpg'
    },
  ])

  // função para criar uma comunidade
  function handleCreateCommunity(event) {

    event.preventDefault();

    const formData = new FormData(event.target)

    const community = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
      link: formData.get('link')
    }

    setCommunities([...communities, community])

  }

  useEffect(() => {
    GithubApi.getFollowers(githubUser).then((res) => {
      setFollowers(res);
    });
  }, [githubUser]);

  useEffect(() => {
    GithubApi.getFollowing(githubUser).then((res) => {
      setFollowing(res);
    });
  }, [githubUser]);

  function handleShowMoreFollowers(e) {
    e.preventDefault();
    setIsShowingMoreFollowers(!isShowingMoreFollowers);
  }

  function handleShowMoreCommunities(e) {
    e.preventDefault();
    setIsShowingMoreCommunities(!isShowingMoreCommunities);
  }

  function handleShowMoreFollowing(e) {
    e.preventDefault();
    setIsShowingMoreFollowing(!isShowingMoreFollowing);
  }


  return (
    <>
      <AlurakutMenu githubUser={githubUser} />

      <MainGrid>

        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)!
            </h1>
            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
          </Box>

          <Box>

            <h2 className="subTitle">Crie sua própria comunidade !</h2>

            <form onSubmit={(event) => handleCreateCommunity(event)}>

              <div>
                <label className="label">Comunidade</label>
                <input placeholder="insira aqui o nome da comunidade"
                  name="title"
                  type="text"
                />
              </div>

              <div>
                <label className="label">Imagem</label>
                <input placeholder="URL da imagem para capa"
                  name="image"
                  type="file"
                />
              </div>

              <div>
                <label className="label">Link</label>
                <input placeholder="insira um link para sua nova comunidade"
                  name="link"
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>

          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMoreCommunities}>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.slice(0, 6).map((c) => {
                return (
                  <li key={c.id}>
                    <a href={`/users/${c.title}`}>
                      <img src={c.image} />
                      <span>{c.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

            {communities.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreCommunities(e)}
                >
                  {isShowingMoreCommunities ? 'Ver menos' : 'Ver mais'}
                </button>

              </>
            )}
            {isShowingMoreCommunities && (
              <>
                <ul>
                  {communities.map((c) => {
                    return (
                      <li key={c.id}>
                        <a href={`/users/${c.title}`}>
                          <img src={c.image} />
                          <span>{c.title}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>

                {communities.length > 6 && (
                  <>
                    <hr />
                    <button
                      className="toggleButton"
                      onClick={(e) => handleShowMoreCommunities(e)}
                    >
                      {isShowingMoreCommunities ? 'Ver menos' : 'Ver mais'}
                    </button>

                  </>
                )}

              </>
            )}
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMoreFollowers}>
            <h2 className="smallTitle">
              Seguidores do GitHub ({followers.length})
            </h2>

            <ul>
              {followers.slice(0, 6).map((f) => {
                return (
                  <li key={f.id}>
                    <a href={`https://github.com/${f.login}`}>
                      <img src={`https://github.com/${f.login}.png`} />
                      <span>{f.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {followers.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreFollowers(e)}
                >
                  {isShowingMoreFollowers ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper isShowingMoreItems={isShowingMoreFollowing}>
            <h2 className="smallTitle">
              Seguindo no GitHub ({following.length})
            </h2>

            <ul>
              {following.slice(0, 6).map((f) => {
                return (
                  <li key={f.id}>
                    <a href={`https://github.com/${f.login}`}>
                      <img src={`https://github.com/${f.login}.png`}

                      />
                      <span>{f.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            {following.length > 6 && (
              <>
                <hr />
                <button
                  className="toggleButton"
                  onClick={(e) => handleShowMoreFollowing(e)}
                >
                  {isShowingMoreFollowing ? 'Ver menos' : 'Ver mais'}
                </button>
              </>
            )}
            {isShowingMoreFollowing && (
              <>
                <ul>
                  {communities.map((c) => {
                    return (
                      <li key={c.id}>
                        <a href={`/users/${c.title}`}>
                          <img src={c.image} />
                          <span>{c.title}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>

                {following.length > 6 && (
                  <>
                    <hr />
                    <button
                      className="toggleButton"
                      onClick={(e) => handleShowMoreFollowing(e)}
                    >
                      {isShowingMoreFollowing ? 'Ver menos' : 'Ver mais'}
                    </button>

                  </>
                )}
              </>
            )}
          </ProfileRelationsBoxWrapper>

        </div>

      </MainGrid>
    </>
  )
}