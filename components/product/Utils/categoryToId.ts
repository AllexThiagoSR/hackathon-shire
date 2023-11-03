const categoryToId = (category: string) => {
  switch (category) {
    case "Acessórios para Veículos":
      return "MLB5672";
    case "Agro":
        return "MLB 271599";
    case "Alimentos e Bebidas":
        return "MLB1403";
    case "Animais":
        return "MLB1071";
    case "Antiguidades e Coleções":
        return "MLB1367";
    case "Arte, Papelaria e Armarinho":
        return "MLB1368";
    case "Bebês":
        return "MLB1384";
    case "Beleza e Cuidado Pessoal":
        return "MLB1246";
    case "Brinquedos e Hobbies":
        return "MLB1132";
    case "Calçados, Roupas e Bolsas":
        return "MLB1430";
    case "Câmeras e Acessórios":
        return "MLB1039";
    case "Carros, Motos e Outros":
        return "MLB1743";
    case "Casa, Móveis e Decoração":
        return "MLB1574";
    case "Celulares e Telefones":
        return "MLB1051";
    case "Construção":
        return "MLB1500";
    case "Eletrodomésticos":
        return "MLB5726";
    case "Eletrônicos, Áudio e Vídeo":
        return "MLB1000";
    case "Esportes e Fitness":
        return "MLB1276";
    case "Ferramentas":
        return "MLB263532";
    case "Festas e Lembrancinhas":
        return "MLB12404";
    case "Games":
        return "MLB1144";
    case "Imóveis":
        return "MLB1459";
    case "Indústria e Comércio":
        return "MLB1499";
    case "Informática":
        return "MLB1648";
    case "Ingressos":
        return "MLB218519";
    case "Instrumentos Musicais":
        return "MLB1182";
    case "Joias e Relógios":
        return "MLB3937";
    case "Livros, Revistas e Comics":
        return "MLB1196";
    case "Música, Filmes e Seriados":
        return "MLB1168";
    case "Saúde":
        return "MLB264586";
    case "Serviços":    
    default:
      return "MLB1953";
  }
}

export default categoryToId;