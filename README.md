# Hardhat-Fireblocks-Sample

Fireblocks の鍵を使えるように設定した Hardhat サンプルプロジェクトです。

## 動かし方

```bash
cd backend
```

- インストール

  ```bash
    yarn
  ```

- 初期設定

  ネットワーク毎にこのコマンドを実行する必要あり

  ```bash
    npx hardhat resetContractAddressesJson  --network localhost
  ```

- コンパイル

  ```bash
    yarn compile
  ```

- テスト

  ```bash
    yarn test
  ```

- テストカバレッジ

  ```bash
    yarn coverage
  ```

- タスク実行

  ```bash
  npx hardhat getOwner --network localhost
  ```

### 参考文献

1. [GitHub - hardhat-fireblocks](https://github.com/fireblocks/hardhat-fireblocks)
