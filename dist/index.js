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
    .action((key, content) => {
    storage.saveIdea(key, content);
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
        console.log(chalk.white(`\n${idea.content}\n`));
    }
    else {
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
        console.log(`${chalk.blue('•')} ${chalk.bold(idea.key)} ${chalk.gray(`(${new Date(idea.createdAt).toLocaleDateString()})`)}`);
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
    }
    else {
        console.log(chalk.red(`✖ No idea found with key: ${chalk.bold(key)}`));
    }
});
program.parse(process.argv);
