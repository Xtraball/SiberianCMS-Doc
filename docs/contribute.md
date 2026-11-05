## Contribute To SiberianCMS

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/contribute.md)

Anyone can contribute to SiberianCMS. And we need your contributions.

There are multiple ways to contribute: [report bugs](#submit-an-issue), [improve the docs](#help-improve-the-docs), and [contribute code](#share-new-features).

## Submit An Issue

1. Search into existing issues before submitting yours
2. Fork our Github repo: `https://github.com/Xtraball/Siberian.git`
3. Create a new branch from `trunk` (the default branch)
    
    - Issue `git checkout -b issueid-shortdescription`
    
    - Feature `git checkout -b feature-name`
    
4. Review our [pull request guidelines](#pull-request).
5. Follow our [coding conventions](#conventions).
6. Test your code so it won't break any feature, and add a test that fails on `trunk` without your change (`php tests/php-upgrade/run.php`)
7. [Submit a pull request!](#pull-request)

## Help Improve The Docs

Our documentation is hosted on github too, and will grow with new features, help us improve it the same way.

If you found a typo, make a tutorial or have a better way to describe our documentation, fork it !

Fork the Github repo: `git clone https://github.com/Xtraball/SiberianCMS-Doc.git`

We use MkDocs to generate the docs, so every page is written in Markdowns

## Share new features

If you have developed, who are aiming to develop new features to share with the SiberianCMS community you are welcome.

We wrote a [complete documentation](module) on how to create new `modules`

## Pull Request

Keep your pull requests as small as possible, bundle only one feature or bug fix per pull request, it is also easier for us to test single bug fixes

Before opening it, run `tests/php-upgrade/check-pr.sh` (it fails on CRLF line endings and on new texts that are not in a `.po` catalog) and read [AGENTS.md](https://github.com/Xtraball/Siberian/blob/trunk/AGENTS.md): new behaviour is an option off by default, one fix per pull request, new user-visible texts go in `siberian/languages/base/c_<context>.po` through `p__('<context>', '...')`, LF line endings only, and Android and iOS are changed together (see `docs/mobile-parity.md`).

The repository `CHANGELOG.md` has an `[Unreleased]` section at the top (Added, Changed, Fixed), add a line there for user-visible changes, in the form `- YYYY-MM-DD Area: what changed`.

## Conventions

We try to follow the PSR-1 standard as much as possible, and to keep our code clear and understandable, that's all !

* Comment every portion of code you think could be hard to understand.

## License

By contributing your code, you agree to license your contribution under the [OSL license](https://opensource.org/licenses/OSL-3.0).