---
> **ARTS-week-32**
> 2021-08-22 08:04
---


## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm： 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

480. 滑动窗口中位数：https://leetcode-cn.com/submissions/detail/207095459/

面试题 02.01. 移除重复节点：https://leetcode-cn.com/submissions/detail/207072239/

540. 有序数组中的单一元素：https://leetcode-cn.com/submissions/detail/207068002/

### 2.Review:

https://www.mihaileric.com/posts/machine-learning-project-model-v1/
从零开始的完整机器学习项目：模型 V1

#### 点评：

在这篇文章中，将继续最后一个帖子离开的地方，并解决整个机器学习产品生命周期的下一阶段：获取初始数据集并执行探索性数据分析。作为快速复习者，请记住，的目标是将数据驱动的解决方案应用于从初始设置到部署的问题。将进行的阶段包括：

- 这些将涵盖以下所有内容：
  - 构想、组织代码库和设置模组
  - 数据集采集和探索性数据分析
  - 使用 v1 模型构建和测试管道（此帖子）
  - 执行错误分析并向 v2 模型重复
  - 部署模型并连接连续集成解决方案

- 数据预处理：作为构建模型的第一步，需要以正确的格式获取数据，以便将其摄取到训练管道中。回想一下，在上一篇博文中，进行了一些初步的探索性分析以了解数据集的特征。现在想要获取这些数据洞察，并将初始原始数据清理和预处理到 X \右箭头 y十→是 监督学习所需的映射。为此，将定义一些独立的脚本来进行清理和预处理。使用独立脚本，因为这样可以更轻松地分离出最终可以用作管道中可执行阶段的功能。在实践中，这些阶段最终会通过诸如Airflow 之类的工具作为工作流自动化。首先定义一个名为normalize_and_clean_data.py的脚本（完整参考在这里）。
  - 这个脚本首先读入的数据：
  ```python
  def read_datapoints(datapath: str) -> List[Dict]:
    with open(datapath) as f:
        reader = csv.DictReader(f, delimiter="\t", fieldnames=[
            "id",
            "statement_json",
            "label",
            "statement",
            "subject",
            "speaker",
            "speaker_title",
            "state_info",
            "party_affiliation",
            "barely_true_count",
            "false_count",
            "half_true_count",
            "mostly_true_count",
            "pants_fire_count",
            "context",
            "justification"
        ])
        return [row for row in reader]
  ```
  - 然后进行归一化和清洗：
  ```python
  def normalize_and_clean(datapoints: List[Dict]) -> List[Dict]:
    return normalize_and_clean_speaker_title(
        normalize_and_clean_party_affiliations(
            normalize_and_clean_state_info(
                normalize_and_clean_counts(
                    normalize_labels(
                        datapoints
                    )
                )
            )
        )
    )
  ```
  - 每个normalize_and_clean函数从原始数据集中清除一个字段。例如，对于Speaker_title字段，有：
  ```python
  def normalize_and_clean_speaker_title(datapoints: List[Dict]) -> List[Dict]:
    normalized_datapoints = []
    for datapoint in datapoints:
        # First do simple cleaning
        normalized_datapoint = deepcopy(datapoint)
        old_speaker_title = normalized_datapoint["speaker_title"]
        old_speaker_title = old_speaker_title.lower().strip().replace("-", " ")
        # Then canonicalize
        if old_speaker_title in CANONICAL_SPEAKER_TITLES:
            old_speaker_title = CANONICAL_SPEAKER_TITLES[old_speaker_title]
        normalized_datapoint["speaker_title"] = old_speaker_title
        normalized_datapoints.append(normalized_datapoint)
    return normalized_datapoints
  ```
  - 为了产生一致的条目，此函数将字段小写，去除任何空格，然后替换某些字符，如破折号。
  - 因为的离线特征提取可能是一项昂贵的操作（它不在这里，但让练习良好的工程实践），将bin-形成分离到自己的脚本compute_credit_bins.py 中，其主要功能是：
  ```python
  if __name__ == "__main__":
    args = read_args()
    train_df = pd.read_json(args.train_data_path, orient="records")
    optimal_credit_bins = {}
    for credit_name in ["barely_true_count",
                        "false_count",
                        "half_true_count",
                        "mostly_true_count",
                        "pants_fire_count"]:
        optimal_credit_bins[credit_name] = list(np.histogram_bin_edges(train_df[credit_name],
                                                                       bins=10))
    with open(args.output_path, "w") as f:
        print(optimal_credit_bins)
        json.dump(optimal_credit_bins, f)
  ```
  - 这里值得注意的一个工程设计决策：对于这些清理和处理步骤中的每一个，确保脚本对输入文件进行操作并生成输出文件。这保证了的输入保持不变，并且很容易重现。有了这个，就可以开始接触模型（即“真正的”机器学习）。

- 定义模型:为了建立一些性能相当好的模型，将选择一个随机森林作为的基线模型。就的目的而言，随机森林相对容易设置，并且通常用作任何新问题的首选模型类。如果调整得当，随机森林可以非常有竞争力，甚至是最先进的。如果可以更快地将其完全集成到下游应用程序中，您当然可以使用更简单的东西（例如手动的、基于规则的系统）。这是所有其他模型都应该继承的基本模型类定义。
  - 完整定义在这里:
  ```python
  class Model(ABC):
    @abstractmethod
    def train(self,
              train_datapoints: List[Datapoint],
              val_datapoints: List[Datapoint],
              cache_featurizer: Optional[bool] = False) -> None:
        """
        Performs training of model. The exact train implementations are model specific.
        :param train_datapoints: List of train datapoints
        :param val_datapoints: List of validation datapoints that can be used
        :param cache_featurizer: Whether or not to cache the model featurizer
        :return:
        """
        pass
    
    @abstractmethod
    def predict(self, datapoints: List[Datapoint]) -> np.array:
        """
        Performs inference of model on collection of datapoints. Returns an
        array of model predictions. This should only be called after the model
        has been trained.
        :param datapoints: List of datapoints to perform inference on
        :return: Array of predictions
        """
        pass
    
    @abstractmethod
    def compute_metrics(self, eval_datapoints: List[Datapoint], split: Optional[str] = None) -> Dict:
        """
        Compute a set of model-specifc metrics on the provided set of datapoints.
        :param eval_datapoints: Datapoints to compute metrics for
        :param split: Data split on which metrics are being computed
        :return: A dictionary mapping from the name of the metric to its value
        """
        pass
    
    @abstractmethod
    def get_params(self) -> Dict:
        """
        Return the model-specific parameters such as number of hidden-units in the case
        of a neural network or number of trees for a random forest
        :return: Dictionary containing the model parameters
        """
        pass
  ```
  - 鉴于此模型接口结合正在利用Scikit-Learn为的模型提供动力的事实，实际的模型定义还不错：
  ```python
  class RandomForestModel(Model):
    def __init__(self, config: Optional[Dict] = None):
        self.config = config
        model_cache_path = os.path.join(config["model_output_path"], "model.pkl")
        self.featurizer = TreeFeaturizer(os.path.join(config["featurizer_output_path"],
                                                      "featurizer.pkl"),
                                         config)
        if config["evaluate"] and not os.path.exists(model_cache_path):
            raise ValueError("Model output path does not exist but in `evaluate` mode!")
        if model_cache_path and os.path.exists(model_cache_path):
            LOGGER.info("Loading model from cache...")
            with open(model_cache_path, "rb") as f:
                self.model = pickle.load(f)
        else:
            LOGGER.info("Initializing model from scratch...")
            self.model = RandomForestClassifier(**self.config["params"])
    
    def train(self,
              train_datapoints: List[Datapoint],
              val_datapoints: Optional[List[Datapoint]],
              cache_featurizer: Optional[bool] = False) -> None:
        self.featurizer.fit(train_datapoints)
        if cache_featurizer:
            feature_names = self.featurizer.get_all_feature_names()
            with open(os.path.join(self.config["model_output_path"],
                                   "feature_names.pkl"), "wb") as f:
                pickle.dump(feature_names, f)
            self.featurizer.save(os.path.join(self.config["featurizer_output_path"],
                                              "featurizer.pkl"))
        train_labels = [datapoint.label for datapoint in train_datapoints]
        LOGGER.info("Featurizing data from scratch...")
        train_features = self.featurizer.featurize(train_datapoints)
        self.model.fit(train_features, train_labels)
    
    def compute_metrics(self, eval_datapoints: List[Datapoint], split: Optional[str] = None) -> Dict:
        expected_labels = [datapoint.label for datapoint in eval_datapoints]
        predicted_proba = self.predict(eval_datapoints)
        predicted_labels = np.argmax(predicted_proba, axis=1)
        accuracy = accuracy_score(expected_labels, predicted_labels)
        f1 = f1_score(expected_labels, predicted_labels)
        auc = roc_auc_score(expected_labels, predicted_proba[:, 1])
        conf_mat = confusion_matrix(expected_labels, predicted_labels)
        tn, fp, fn, tp = conf_mat.ravel()
        split_prefix = "" if split is None else split
        return {
            f"{split_prefix} f1": f1,
            f"{split_prefix} accuracy": accuracy,
            f"{split_prefix} auc": auc,
            f"{split_prefix} true negative": tn,
            f"{split_prefix} false negative": fn,
            f"{split_prefix} false positive": fp,
            f"{split_prefix} true positive": tp,
        }
    
    def predict(self, datapoints: List[Datapoint]) -> np.array:
        features = self.featurizer.featurize(datapoints)
        return self.model.predict_proba(features)
    
    def get_params(self) -> Dict:
        return self.model.get_params()
    
    def save(self, model_cache_path: str) -> None:
        LOGGER.info("Saving model to disk...")
        with open(model_cache_path, "wb") as f:
            pickle.dump(self.model, f)
  ```
  - 虽然这看起来很复杂，但如果仔细观察，实际模型训练的大部分只是几行。剩下的就是调用的 featurizer（细节如下）并执行设置/缓存。

- 特征
  - 如果没有一组好的预测特征，机器学习模型本身就毫无用处。在的例子中，想给的随机森林正确的信号来学习足够的假新闻鉴别器。
  - 将为初始模型使用两种类型的特征：1）manual 特征和 2）ngram 特征。Ngram 特征在处理文本时通常很有用，因为它允许获取数据中的某些词汇和语言模式。将对这些特征使用 tfidf 权重，而不是原始 ngram，因为这些类型的权重经常用于信息检索，以帮助提高/降低某些单词的重要性。许多使用 ngram 功能完成的工作由库（如 Scikit-learn）为处理。将使用自己的manual 功能来扩充这个初始功能集。这类功能是真正可以编写特定数据洞察的地方。作为一个例子，选择以提取和独热编码各种领域，诸如 speaker，speaker_title，state_info，和party_affiliation。此外，在探索性数据分析中看到的一个特别有趣的领域是“信用记录”。将这些计数归入 10 个区间之一，每个区间的边以特定于字段的方式定义。
  - 这一切看起来像这样：
  ```python
  def extract_manual_features(datapoints: List[Datapoint], optimal_credit_bins: Dict) -> List[Dict]:
    all_features = []
    for datapoint in datapoints:
        features = {}
        features["speaker"] = datapoint.speaker
        features["speaker_title"] = datapoint.speaker_title
        features["state_info"] = datapoint.state_info
        features["party_affiliation"] = datapoint.party_affiliation
        # Compute credit score features
        datapoint = dict(datapoint)
        for feat in ["barely_true_count", "false_count", "half_true_count", "mostly_true_count", "pants_fire_count"]:
            features[feat] = str(compute_bin_idx(datapoint[feat], optimal_credit_bins[feat]))
        all_features.append(features)
    return all_features
  ```
  - 特征化代码的核心看起来像这样（使用一堆 Scikit-learn 原语定义）：
  ```python
  dict_featurizer = DictVectorizer()
  tfidf_featurizer = TfidfVectorizer()

  statement_transformer = FunctionTransformer(extract_statements)
  manual_feature_transformer = FunctionTransformer(partial(extract_manual_features,
                                                              optimal_credit_bins=optimal_credit_bins))

  manual_feature_pipeline = Pipeline([
      ("manual_features", manual_feature_transformer),
      ("manual_featurizer", dict_featurizer)
  ])

  ngram_feature_pipeline = Pipeline([
      ("statements", statement_transformer),
      ("ngram_featurizer", tfidf_featurizer)
  ])

  self.combined_featurizer = FeatureUnion([
      ("manual_feature_pipe", manual_feature_pipeline),
      ("ngram_feature_pipe", ngram_feature_pipeline)
  ])
  ```
  - 上面要注意的一件事是，一旦提取了单独的 ngram 和手动特征向量，将它们连接成一个向量（通过特征联合）。这个聚合向量现在存储了想要从数据中捕获并提供给模型的所有最显着的信息。关于工程的最后评论：将定义一个单独的Featurizer类，它将公开一个用于训练特征化器（对于基于 ngram 的权重是必需的）和特征化任意数据的接口：
  ```python
  class TreeFeaturizer(object):
    def __init__(*args):
        pass
    
    def fit(self, datapoints: List[Datapoint]) -> None:
        raise NotImplementedError
    
    def featurize(self, datapoints: List[Datapoint]) -> np.array:
        raise NotImplementedError
  ```

- 训练流水线：好的，现在有了很棒的功能和很酷的模型。让将它们编织成一个功能训练/评估管道。任何好的训练管道中的一个重要步骤是使其易于配置，即使其易于即插即用管道的不同组件/属性，例如模型、特征化或数据参数。您通常通过传入命令行级参数或提供配置文件来使这些管道可配置。我个人更喜欢配置路径，因为它允许在代码存储库中对实际配置文件进行版本控制和跟踪。将使用JSON格式的文件配置管道。当然，您可以使用其他格式，如YAML等，但我个人对 JSON 有偏见，因为我发现它更易于阅读。
  ```json
  {
    "model": "random_forest",
    "train_data_path": "data/processed/cleaned_train_data.json",
    "val_data_path": "data/processed/cleaned_val_data.json",
    "test_data_path": "data/processed/cleaned_test_data.json",
    "featurizer_output_path": "model_checkpoints/random_forest",
    "credit_bins_path": "data/processed/optimal_credit_bins.json",
    "model_output_path": "model_checkpoints/random_forest",
    "evaluate": false,
    "params": {}
  }
  ```
  - 定义相对简单。定义模型类型，应该从哪里提取数据，应该将模型和特征器写入哪里，是处于评估模式还是训练模式，以及任何特定于模型的参数。在此处将参数保留为空，因为使用的是 Scikit-learn 随机森林默认值，但您可以使用此字段指定您想要使用的任何内容（即树的数量、分割标准等）接下来将转到训练管道，它将负责将所有内容拼接成一系列可执行的步骤。在前几节中完成了大部分繁重的工作，因此管道主要是样板：
  ```python
  if __name__ == "__main__":
    args = read_args()
    with open(args.config_file) as f:
        config = json.load(f)
    
    set_random_seed(42)
    mlflow.set_experiment(config["model"])
    
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_output_path = os.path.join(base_dir, config["model_output_path"])
    # Update full model output path
    config["model_output_path"] = model_output_path
    os.makedirs(model_output_path, exist_ok=True)
    # Copy config to model directory
    copy(args.config_file, model_output_path)
    with mlflow.start_run() as run:
        with open(os.path.join(model_output_path, "meta.json"), "w") as f:
            json.dump({"mlflow_run_id": run.info.run_id}, f)
        mlflow.set_tags({
            "evaluate": config["evaluate"]
        })
        
        train_data_path = os.path.join(base_dir, config["train_data_path"])
        val_data_path = os.path.join(base_dir, config["val_data_path"])
        test_data_path = os.path.join(base_dir, config["test_data_path"])
        # Read data
        train_datapoints = read_json_data(train_data_path)
        val_datapoints = read_json_data(val_data_path)
        test_datapoints = read_json_data(test_data_path)
        
        if config["model"] == "random_forest":
            config["featurizer_output_path"] = os.path.join(base_dir, config["featurizer_output_path"])
            model = RandomForestModel(config)
        else:
            raise ValueError(f"Invalid model type {config['model']} provided")
        
        if not config["evaluate"]:
            LOGGER.info("Training model...")
            model.train(train_datapoints, val_datapoints, cache_featurizer=True)
            if config["model"] == "random_forest":
                # Cache model weights on disk
                model.save(os.path.join(model_output_path, "model.pkl"))
        
        mlflow.log_params(model.get_params())
        LOGGER.info("Evaluating model...")
        metrics = model.compute_metrics(val_datapoints, split="val")
        LOGGER.info(f"Val metrics: {metrics}")
        mlflow.log_metrics(metrics)
  ```
- 功能测试
  - 当然可以运行完整的管道（会！）但是每次对特征化代码进行小的更改时，真的必须从头开始重新训练模型吗？这很快变得不切实际，特别是如果正在与一个共享代码库的团队合作（即，如果我对特征进行了小的更改，每个人都需要在本地重新训练模型吗？）。为了解决这个问题，需要包括功能测试。这是更广泛的软件工程中非常常见的做法，但遗憾的是，我在机器学习社区中很少看到这种做法。出于目的，将编写一些不同的功能测试。
  - 首先，将测试特征化代码。这是超级重要的。不正确的特征化意味着混淆的模型意味着混淆的人类。将测试每个归一化函数：
  ```python
  def test_compute_bin_idx():
    bins = [0, 4, 10, 12]
    assert compute_bin_idx(0, bins) == 0
    assert compute_bin_idx(3, bins) == 1
    assert compute_bin_idx(4, bins) == 1
    assert compute_bin_idx(12, bins) == 3


  def test_normalize_labels():
      datapoints = [
          {"label": "pants-fire", "ignored_field": "blah"},
          {"label": "barely-true"},
          {"label": "false"},
          {"label": "true"},
          {"label": "half-true"},
          {"label": "mostly-true"}
      ]
      
      expected_converted_datapoints = [
          {"label": False, "ignored_field": "blah"},
          {"label": False},
          {"label": False},
          {"label": True},
          {"label": True},
          {"label": True}
      ]
      
      assert normalize_labels(datapoints) == expected_converted_datapoints
  ...
  ```
  - 还将测试的建模代码。在这里，将检查函数的输出是否具有适当的形状，它们是否在正确的范围内（即\leq 1≤1 如果概率），并且可以过度拟合一个小训练集：
  ```python
  def test_rf_overfits_small_dataset(config, sample_datapoints):
    model = RandomForestModel(config=config)
    train_labels = [True, False, True]
    
    model.train(sample_datapoints)
    predicted_labels = np.argmax(model.predict(sample_datapoints), axis=1)
    predicted_labels = list(map(lambda x: bool(x), predicted_labels))
    assert predicted_labels == train_labels


  def test_rf_correct_predict_shape(config, sample_datapoints):
      model = RandomForestModel(config=config)
      
      model.train(sample_datapoints)
      predicted_labels = np.argmax(model.predict(sample_datapoints), axis=1)
      
      assert predicted_labels.shape[0] == 3


  def test_rf_correct_predict_range(config, sample_datapoints):
      model = RandomForestModel(config=config)
      
      model.train(sample_datapoints)
      predicted_probs = model.predict(sample_datapoints)
      
      assert (predicted_probs <= 1).all()
    
  ```
  - 将采用的另一种非常重要的测试是数据完整性测试。在这里的意思是检查您的数据源是否具有预期的格式、类型、值范围等的测试。如果数据没有您期望的格式，则管道的其余部分将被搞砸，因为数据是训练管道的开始。当您有一个持续运行的ETL管道定期摄取、处理和转储新数据时，数据测试变得尤为重要。虽然在这里处理的是静态研究数据集，但无论如何都会进行编写数据完整性测试的练习。为此，将使用库Great Expectations。它允许您以简洁的 JSON 片段指定您对数据的期望。出于目的，将检查数据中的一些内容：
    - 所有的数据拆分都有预期的字段（列）
    - 定义了语句字段（长度至少为 1）
    - 每个“信用历史”列都是≥0
    - 标签是布尔值
    - 在期望的语法中，看起来像这样：
    ```json
    {
      "data_asset_type": "Dataset",
      "expectation_suite_name": "fake_news_data_suite",
      "expectations": [
        {
          "expectation_type": "expect_table_columns_to_match_set",
          "kwargs": {
            "column_set": [
              "id",
              "statement_json",
              "label",
              "statement",
              "subject",
              "speaker",
              "speaker_title",
              "state_info",
              "party_affiliation",
              "barely_true_count",
              "false_count",
              "half_true_count",
              "mostly_true_count",
              "pants_fire_count",
              "context",
              "justification"
            ]
          },
          "meta": {}
        },
        {
          "expectation_type": "expect_column_values_to_be_in_set",
          "kwargs": {
            "column": "label",
            "value_set": [
              true,
              false
            ]
          },
          "meta": {}
        },
    ...
    ```
    - 鉴于此数据套件，将使用Python 脚本以编程方式执行它：
    ```python
    context = ge.data_context.DataContext()

    datasource_name = "fake_news_data"

    train_batch = context.get_batch(
        {"path": f"{os.environ['GE_DIR']}/data/processed/cleaned_train_data.json",
         "datasource": datasource_name},
        "fake_news_data_suite")
    val_batch = context.get_batch(
        {"path": f"{os.environ['GE_DIR']}/data/processed/cleaned_val_data.json",
         "datasource": datasource_name},
        "fake_news_data_suite")
    test_batch = context.get_batch(
        {"path": f"{os.environ['GE_DIR']}/data/processed/cleaned_test_data.json",
         "datasource": datasource_name},
        "fake_news_data_suite")

    results = context.run_validation_operator(
        "action_list_operator",
        assets_to_validate=[train_batch, val_batch, test_batch],
        run_id=str(datetime.now()))

    print(results)
    if results["success"]:
        print("Test suite passed!")
        exit(0)
    else:
        print("Test suite failed!")
        exit(1)
    ```
  - 请注意，Great Expectations 还支持直接从命令行运行您的数据套件，但使用的是可以手动调用的 Python 脚本，以便在构建持续集成系统时（在本系列的后续文章中）更轻松一些。

- 把它放在一起


  - 有了所有这些管道，终于可以训练系统：
  ```shell
  python train.py --config-file config/random_forest.json
  ```
  - 输出看起来像这样：
  ```shell
  INFO - 2021-01-21 21:26:49,779 - features.py - Creating featurizer from scratch...
  INFO - 2021-01-21 21:26:49,781 - tree_based.py - Initializing model from scratch...
  INFO - 2021-01-21 21:26:49,781 - train.py - Training model...
  INFO - 2021-01-21 21:26:50,163 - features.py - Saving featurizer to disk...
  INFO - 2021-01-21 21:26:50,169 - tree_based.py - Featurizing data from scratch...
  INFO - 2021-01-21 21:26:59,360 - tree_based.py - Saving model to disk...
  INFO - 2021-01-21 21:26:59,459 - train.py - Evaluating model...
  INFO - 2021-01-21 21:26:59,584 - train.py - Val metrics: {'val f1': 0.7587628865979381, 'val accuracy': 0.7266355140186916, 'val auc': 0.8156070164865074, 'val true negative': 381, 'val false negative': 116, 'val false positive': 235, 'val true positive': 552}
  ```
  - 如果在测试集上运行：
  ```shell
  INFO - 2021-01-21 21:28:46,661 - train.py - Test metrics: {'test f1': 0.7828348504551366, 'test accuracy': 0.7396726422447389, 'test auc': 0.8053471940466883, 'test true negative': 347, 'test false negative': 125, 'test false positive': 209, 'test true positive': 602}
  ```
  - 根据原始论文表 2 中的结果，优于他们分析的所有模型。不错！有了这个，就完成了这篇超长的帖子。已经走了很长一段路，从探索性数据分析后的少量数据洞察，到在数据集上训练非常有竞争力的模型的成熟管道。退后一步，请记住，目标不是尽可能构建最好的模型。目标是获得一些相当不错的模型，可以将其展示给用户以提供价值并启动数据飞轮。当然可以通过执行超参数调整、使用更多功能等来提高该模型的性能。但这留给读者作为练习。

### 3.Tip:

#### Dbeaver 连接数据库驱动配置问题

```shell
窗口—>首选项—>DBeaver—>驱动—>maven
选择添加镜像，这里采用阿里镜像：
http://maven.aliyun.com/nexus/content/groups/public/
然后向上移动到第一行
```

#### Sublime 列对齐功能

```shell
1. Ctrl + A （全选）
2. Ctrl + Shift + L （进入列模式）
3. 按方向键（右键），使光标置于每一行末尾，解除全选状态
4. 再按 Ctrl + 方向键（左键），使光标置于第二列数据的开头
5. 最后 Ctrl + K（Alignment插件的改键，原来的ctrl+alt+a，这个组合键可以说和很多软件都有热键冲突，果断更改），使第二行数据对齐！
```

#### golang 文件流 MD5 生成方式

```golang
func md5V(str string) string  {
    h := md5.New()
    io.Copy(h, fr)
    return base64.StdEncoding.EncodeToString(h.Sum([]byte(nil)))
}
```


### 4.Share:

https://zhuanlan.zhihu.com/p/163558476
windows10 部署 docker+k8s 集群

https://dabao.me/k8s/k8s-is-starting.html
解决Windows下Docker Desktop 总是 kubernetes is starting...

https://yeasy.gitbook.io/docker_practice/repository/registry
私有仓库

https://www.jianshu.com/p/7f920ca189ce
如何在 Ubuntu 安装 Docker ？

https://blog.csdn.net/qq_32828933/article/details/104220570
CentOS 8 安装 docker/docker-compose