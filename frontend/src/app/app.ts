import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-root',
//   imports: [RouterOutlet],
  imports: [RouterOutlet, FormsModule,TitleCasePipe,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Pokédex');
  pokemon = signal<any>(null);
  pokemonName = signal('');

  constructor(private pokemonService: PokemonService) {}  // ← Inject service

  fetchPokemon() {
    const name = this.pokemonName().toLowerCase();
    if (!name) return;

    this.pokemonService.getPokemon(name).subscribe({
      next: (data) => this.pokemon.set(data),
      error: (err) => console.error('Pokémon not found:', err)
    });
  }
}
