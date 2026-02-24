# 🏛️ Persephone's House - The Sims 4 Portfolio

Um site moderno, responsivo e otimizado para SEO, desenvolvido com **Bootstrap 5** e inspirado na mitologia grega e no tema de Perséfone.

## 📋 Características

✅ **Design Responsivo** - Funciona perfeitamente em desktop, tablet e mobile  
✅ **Sidebar Fixo** - Menu de navegação lateral com perfil redondo  
✅ **Cores Gregas** - Paleta de cores com tons de branco, azul e roxo  
✅ **Font Awesome Icons** - Ícones profissionais para redes sociais  
✅ **Bootstrap 5** - Framework moderno e confiável  
✅ **SEO Otimizado** - Meta tags, Open Graph e práticas recomendadas  
✅ **Formulário de Contato** - Com validação e feedback ao usuário  
✅ **Uma Página Única** - Tudo em um único arquivo HTML para facilitar edição  
✅ **Textura Grega** - Padrão de fundo inspirado em casas gregas  
✅ **JavaScript Minimalista** - Apenas o necessário para interatividade  

## 📁 Estrutura de Arquivos

```
persephoneshousesims.github.io/
├── index.html          # Arquivo principal do site
├── style.css           # Estilos personalizados
├── script.js           # JavaScript interativo
├── assets/             # Pasta para imagens e recursos
│   ├── profile.jpg     # Foto de perfil (redonda)
│   ├── casa1.jpg       # Imagem da criação 1
│   ├── casa2.jpg       # Imagem da criação 2
│   ├── casa3.jpg       # Imagem da criação 3
│   ├── personagem1.jpg # Personagem 1
│   ├── personagem2.jpg # Personagem 2
│   ├── personagem3.jpg # Personagem 3
│   ├── about.jpg       # Imagem da seção "Sobre"
│   └── og-image.jpg    # Imagem para compartilhamento nas redes sociais
└── README.md           # Este arquivo
```

## 🎨 Paleta de Cores

| Cor | Hexadecimal | Uso |
|-----|-------------|-----|
| Roxo Primário | #6b5b9e | Texto e botões principais |
| Azul Claro | #a8d8f0 | Acentos e destaques |
| Azul Escuro | #4a90a4 | Hover e efeitos |
| Branco | #ffffff | Fundo e texto |
| Cinza Claro | #f5f7fa | Seções alternadas |

## 🚀 Como Começar

### 1. Criar a Pasta de Assets

```bash
mkdir assets
```

### 2. Adicionar Imagens

Coloque as seguintes imagens na pasta `assets/`:

- `profile.jpg` - Sua foto de perfil (recomendado: 300x300px)
- `casa1.jpg` - Primeira criação (recomendado: 600x400px)
- `casa2.jpg` - Segunda criação (recomendado: 600x400px)
- `casa3.jpg` - Terceira criação (recomendado: 600x400px)
- `personagem1.jpg` - Personagem 1 (recomendado: 300x300px)
- `personagem2.jpg` - Personagem 2 (recomendado: 300x300px)
- `personagem3.jpg` - Personagem 3 (recomendado: 300x300px)
- `about.jpg` - Imagem da seção sobre (recomendado: 500x500px)
- `og-image.jpg` - Imagem para compartilhamento (recomendado: 1200x630px)

### 3. Personalizar Conteúdo

Abra `index.html` e atualize:

#### Nome e Descrição
```html
<h2 class="profile-name">Seu Nome</h2>
<p class="profile-description">Sua descrição aqui...</p>
```

#### Links de Redes Sociais
```html
<a href="https://www.instagram.com/seu_usuario" target="_blank">
    <i class="fab fa-instagram"></i>
</a>
```

#### Seções principais
- **Início**: Personalize o héroe text
- **Casas**: Adicione/remova cards de criações
- **Personagens**: Atualize informações dos personagens
- **Sobre**: Conte sua história
- **Contato**: Seu e-mail

### 4. Integrar Email (Opcional)

O formulário de contato está pronto para integração. Recomendados:

#### Opção 1: Formspree (Simples)
1. Acesse [formspree.io](https://formspree.io)
2. Cadastre-se e crie um novo formulário
3. No arquivo `script.js`, descomente o bloco de código do Formspree
4. Substitua `YOUR_FORM_ID` pelo seu ID

#### Opção 2: EmailJS (Mais Controle)
1. Acesse [emailjs.com](https://www.emailjs.com)
2. Configure seu e-mail
3. Adicione este script no HTML:

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script type="text/javascript">
    emailjs.init('YOUR_PUBLIC_KEY');
</script>
```

#### Opção 3: Google Forms
Crie um formulário no Google Forms e incorpore em um iframe.

## 📱 Responsividade

O site é totalmente responsivo com pontos de quebra em:
- **Desktop**: > 1024px (Sidebar fixo à esquerda)
- **Tablet**: 768px - 1024px (Sidebar ajustado)
- **Mobile**: < 768px (Sidebar deslizável com botão flutuante)

## 🔍 SEO - Boas Práticas Implementadas

✅ **Meta Tags Estruturadas**
- Title único e descritivo
- Description com 150-160 caracteres
- Keywords relevantes

✅ **Open Graph Tags**
- Otimizado para Facebook, Twitter, Instagram
- Imagem para compartilhamento

✅ **Estrutura HTML Semântica**
- Uso de `<header>`, `<main>`, `<section>`, `<footer>`
- Hierarquia correta de headings

✅ **Performance**
- Lazy loading de imagens (implementado em script.js)
- Compressão de CSS e JS
- Media queries otimizadas

✅ **Acessibilidade**
- Alt text em todas as imagens
- Contraste de cores adequado
- Navegação por teclado

## 🛠️ Personalização Avançada

### Adicionar Mais Criações

Para adicionar mais casas ou personagens, copie um card existente:

```html
<div class="col">
    <div class="creation-card">
        <div class="card-image">
            <img src="assets/novacriacab.jpg" alt="Descrição">
            <div class="card-overlay">
                <a href="https://www.youtube.com" target="_blank" class="btn-link">
                    <i class="fas fa-play"></i> Assista
                </a>
            </div>
        </div>
        <div class="card-body">
            <h3>Nome da Criação</h3>
            <p>Descrição da sua criação...</p>
            <div class="card-tags">
                <span class="tag">#Tag1</span>
                <span class="tag">#Tag2</span>
            </div>
        </div>
    </div>
</div>
```

### Mudar Cores

No arquivo `style.css`, altere as variáveis CSS:

```css
:root {
    --primary-color: #6b5b9e;
    --secondary-color: #a8d8f0;
    --accent-color: #4a90a4;
    /* ... */
}
```

### Adicionar Seções Novas

1. Adicione um novo item no menu:
```html
<li><a href="#nova-secao" class="nav-link" data-section="nova-secao">
    <i class="fas fa-icon"></i> Nova Seção
</a></li>
```

2. Crie a seção:
```html
<section id="nova-secao" class="content-section">
    <div class="container">
        <!-- Conteúdo aqui -->
    </div>
</section>
```

## 📧 Contato e Suporte

Para uma integração de contato mais robusta, recomendo:
- **Formspree**: Simples, gratuito até 50 submissions/mês
- **EmailJS**: Livre, sem backend necessário
- **Firebase**: Mais completo e escalável

## 📦 Deploy no GitHub Pages

Como seu site está em `persephoneshousesims.github.io`, ele já é compatível com GitHub Pages:

1. Empurre as alterações para o repositório Git
2. O site será publicado automaticamente em `https://persephoneshousesims.github.io`

## ✨ Tips & Tricks

- Use ferramentas como TinyPNG para comprimir imagens
- Valide o HTML em [html.validator.org](https://html.validator.org)
- Teste SEO em [seobility.net](https://www.seobility.net/pt/)
- Teste responsividade em diferentes dispositivos
- Use o PageSpeed Insights do Google para otimizar performance

## 📄 Licença

Este projeto é fornecido como está, livre para uso e modificação.

---

**Desenvolvido com 💜 e inspiração grega para suas criações The Sims 4**
