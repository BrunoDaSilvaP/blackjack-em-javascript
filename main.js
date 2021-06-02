
        var naipe = ["Spades", "Hearts", "Diamonds", "Clubs"];
        var numeros = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        var deck = new Array();
        var jogadores = new Array();
        var currentJogador = 0;

        function createDeck()
        {
            deck = new Array();
            for (var i = 0 ; i < numeros.length; i++)
            {
                for(var x = 0; x < naipe.length; x++)
                {
                    var valor = parseInt(numeros[i]);
                    if (numeros[i] == "J" || numeros[i] == "Q" || numeros[i] == "K")
                        valor = 10;
                    if (numeros[i] == "A")
                        valor = 11;
                    var card = { Value: numeros[i], Suit: naipe[x], Valor: valor };
                    deck.push(card);
                }
            }
        }

        function createJogadores(num)
        {
            jogadores = new Array();
            for(var i = 1; i <= num; i++)
            {
                var hand = new Array();
                var jogador = { Name: 'Jogador ' + i, ID: i, Pontos: 0, Hand: hand };
                jogadores.push(jogador);
            }
        }

        function createJogadoresUI()
        {
            document.getElementById('jogadores').innerHTML = '';
            for(var i = 0; i < jogadores.length; i++)
            {
                var div_jogador = document.createElement('div');
                var div_jogadorid = document.createElement('div');
                var div_hand = document.createElement('div');
                var div_pontos = document.createElement('div');

                div_pontos.className = 'pontos';
                div_pontos.id = 'pontos_' + i;
                div_jogador.id = 'jogador_' + i;
                div_jogador.className = 'jogador';
                div_hand.id = 'hand_' + i;

                div_jogadorid.innerHTML = 'Jogador ' + jogadores[i].ID;
                div_jogador.appendChild(div_jogadorid);
                div_jogador.appendChild(div_hand);
                div_jogador.appendChild(div_pontos);
                document.getElementById('jogadores').appendChild(div_jogador);
            }
        }

        function shuffle()
        {
            for (var i = 0; i < 1000; i++)
            {
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random() * deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }

        function iniciarBlackjack()
        {
            document.getElementById('btnComecar').value = 'recomeçar';
            document.getElementById("pontos").style.display="none";
            currentJogador = 0;
            createDeck();
            shuffle();
            createJogadores(2);
            createJogadoresUI();
            dealHands();
            document.getElementById('jogador_' + currentJogador).classList.add('active');
        }

        function dealHands()
        {
            for(var i = 0; i < 2; i++)
            {
                for (var x = 0; x < jogadores.length; x++)
                {
                    var card = deck.pop();
                    jogadores[x].Hand.push(card);
                    renderCard(card, x);
                    updatePontos();
                }
            }

            updateDeck();
        }

        function renderCard(card, jogador)
        {
            var hand = document.getElementById('hand_' + jogador);
            hand.appendChild(getCardUI(card));
        }

        function getCardUI(card)
        {
            var el = document.createElement('div');
            var icon = '';
            if (card.Suit == 'Hearts')
            icon='&hearts;';
            else if (card.Suit == 'Spades')
            icon = '&spades;';
            else if (card.Suit == 'Diamonds')
            icon = '&diams;';
            else
            icon = '&clubs;';
            
            el.className = 'card';
            el.innerHTML = card.Value + '<br/>' + icon;
            return el;
        }

        function getPontos(jogador)
        {
            var pontos = 0;
            for(var i = 0; i < jogadores[jogador].Hand.length; i++)
            {
                pontos += jogadores[jogador].Hand[i].Valor;
            }
            jogadores[jogador].Pontos = pontos;
            return pontos;
        }

        function updatePontos()
        {
            for (var i = 0 ; i < jogadores.length; i++)
            {
                getPontos(i);
                document.getElementById('pontos_' + i).innerHTML = jogadores[i].Pontos;
            }
        }

        function mandaUma()
        {
            var card = deck.pop();
            jogadores[currentJogador].Hand.push(card);
            renderCard(card, currentJogador);
            updatePontos();
            updateDeck();
            check();
        }

        function parou()
        {
            if (currentJogador != jogadores.length-1) {
                document.getElementById('jogador_' + currentJogador).classList.remove('active');
                currentJogador += 1;
                document.getElementById('jogador_' + currentJogador).classList.add('active');
            }

            else {
                end();
            }
        }

        function end()
        {
            var vitoria = -1;
            var placar = 0;

            for(var i = 0; i < jogadores.length; i++)
            {
                if (jogadores[i].Pontos > placar && jogadores[i].Pontos < 22)
                {
                    vitoria = i;
                }

                placar = jogadores[i].Pontos;
            }

            document.getElementById('pontos').innerHTML = 'VENCEDOR: JOGADOR ' + jogadores[vitoria].ID;
            document.getElementById("pontos").style.display = "inline-block";
        }

        function check()
        {
            if (jogadores[currentJogador].Pontos > 21)
            {
                document.getElementById('pontos').innerHTML = 'JOGADOR: ' + jogadores[currentJogador].ID + ' SE FODEU!';
                document.getElementById('pontos').style.display = "inline-block";
                end();
            }
        }

        function updateDeck()
        {
            document.getElementById('contador').innerHTML = deck.length;
        }

        window.addEventListener('load', function(){
            createDeck();
            shuffle();
            createJogadores(1);
        });