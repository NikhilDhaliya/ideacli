#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import * as storage from './storage.js';

const program = new Command();

program
  .name('ideacli')
  .description('A fast CLI tool to store and recall ideas')
  .version('1.0.0');

program
  .command('store')
  .description('Save a new idea')
  .argument('<key>', 'The name/key for the idea')
  .argument('<content>', 'The idea content')
  .option('-t, --tags <tags>', 'Comma-separated tags')
  .action((key, content, options) => {
    const tags = options.tags ? options.tags.split(',').map((t: string) => t.trim()) : [];
    storage.saveIdea(key, content, tags);
    console.log(chalk.green(`✔ Idea saved successfully with key: ${chalk.bold(key)}`));
  });

program
  .command('get')
  .description('Fetch an idea by its key')
  .argument('<key>', 'The key of the idea to fetch')
  .action((key) => {
    const idea = storage.getIdea(key);
    if (idea) {
      console.log(chalk.cyan(`\n💡 Idea: ${chalk.bold(key)}`));
      console.log(chalk.gray(`📅 Created: ${new Date(idea.createdAt).toLocaleString()}`));
      if (idea.updatedAt) {
        console.log(chalk.gray(`🔄 Updated: ${new Date(idea.updatedAt).toLocaleString()}`));
      }
      if (idea.tags && idea.tags.length > 0) {
        console.log(chalk.magenta(`🏷  Tags: ${idea.tags.join(', ')}`));
      }
      console.log(chalk.white(`\n${idea.content}\n`));
    } else {
      console.log(chalk.red(`✖ No idea found with key: ${chalk.bold(key)}`));
    }
  });

program
  .command('list')
  .description('See all stored ideas')
  .action(() => {
    const ideas = storage.listIdeas();
    if (ideas.length === 0) {
      console.log(chalk.yellow('No ideas stored yet. Use "store" to add one.'));
      return;
    }

    console.log(chalk.cyan(`\nStored Ideas (${ideas.length}):`));
    ideas.forEach((idea) => {
      const tagsStr = idea.tags && idea.tags.length > 0 ? chalk.magenta(` [${idea.tags.join(', ')}]`) : '';
      console.log(`${chalk.blue('•')} ${chalk.bold(idea.key)}${tagsStr} ${chalk.gray(`(${new Date(idea.createdAt).toLocaleDateString()})`)}`);
    });
    console.log('');
  });

program
  .command('edit')
  .description('Update an existing idea')
  .argument('<key>', 'The key of the idea to edit')
  .argument('<content>', 'The new content for the idea')
  .option('-t, --tags <tags>', 'Updated comma-separated tags')
  .action((key, content, options) => {
    const tags = options.tags ? options.tags.split(',').map((t: string) => t.trim()) : undefined;
    const success = storage.editIdea(key, content, tags);
    if (success) {
      console.log(chalk.green(`✔ Idea ${chalk.bold(key)} updated successfully.`));
    } else {
      console.log(chalk.red(`✖ No idea found with key: ${chalk.bold(key)}`));
    }
  });

program
  .command('search')
  .description('Search ideas by key, content, or tags')
  .argument('<query>', 'The search term')
  .action((query) => {
    const results = storage.searchIdeas(query);
    if (results.length === 0) {
      console.log(chalk.yellow(`No ideas found matching: "${query}"`));
      return;
    }

    console.log(chalk.cyan(`\nSearch Results for "${query}" (${results.length}):`));
    results.forEach((idea) => {
      const tagsStr = idea.tags && idea.tags.length > 0 ? chalk.magenta(` [${idea.tags.join(', ')}]`) : '';
      console.log(`${chalk.blue('•')} ${chalk.bold(idea.key)}${tagsStr}`);
    });
    console.log('');
  });

program
  .command('delete')
  .description('Remove an idea by its key')
  .argument('<key>', 'The key of the idea to remove')
  .action((key) => {
    const deleted = storage.deleteIdea(key);
    if (deleted) {
      console.log(chalk.green(`✔ Idea with key ${chalk.bold(key)} has been removed.`));
    } else {
      console.log(chalk.red(`✖ No idea found with key: ${chalk.bold(key)}`));
    }
  });

program.parse(process.argv);
