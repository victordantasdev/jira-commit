# Softa auto commit

The purpose of this CLI is to facilitate the commits we make in softaliza
projects as we use the `BIR-123` or `GEN-123` pattern to create branches
and automated commits with jira tasks for each project.
And just install the CLI and run it with the command `softa-autocommit` and
then type the commit message and the CLI will mount and commit in the pattern
we follow this way: `git commit -m "BIR-123: asd"` automatically getting the
task ID on the branch you are working on.

## Install

```bash
npm i -g softa-autocommit
```

## Usage

After installation on your machine just type this command on the directory that you're working on

```bash
softa-autocommit
```

## Tips

You can also add an `alias` to your shell profile configuration file with the command

```bash
# on ~/.zshrc or ~/.bashrc
alias gc="softa-autocommit"
```

And you can also concatenate the `git add` command with the CLI

```bash
git add <file> && gc

# Or if you don't have create an alias use:
git add <file> && softa-autocommit
```
